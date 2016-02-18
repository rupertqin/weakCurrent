import React, { Component, PropTypes } from 'react'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'
import { createHistory, useBasename } from 'history'
import { createStore } from 'redux'

// import "../scss/common.scss"

import Request from '../mod/request'

import { Search } from './search.jsx'
import { Login } from './login.jsx'
import Reg from './reg.jsx'
import Cases from './cases.jsx'
import { Navbar } from './navbar.jsx'
import { Create } from './create.jsx'
import { Sidebar } from './sidebar.jsx'
import DocGeneration from './doc_generation.jsx'
import Products from './products.jsx'
import { NoMatch } from './404.jsx'

// Global communicate subscript/dispac
window.Commu = {
    price: 0,
    el: document.createElement('div'),
    event: new Event('compuPrice')
}

class User extends React.Component {
  render() {
    var { userID } = this.props.params;

    return (
        <div className="User">
            <h1>User id: {userID}</h1>
            <ul>
                <li><Link to={`/user/${userID}/tasks/foo`}>foo task</Link></li>
                <li><Link to={`/user/${userID}/tasks/bar`}>bar task</Link></li>
            </ul>
            {this.props.children}
        </div>
    );
  }
}

class Task extends React.Component {
  render() {
    var { userID, taskID } = this.props.params;

    return (
        <div className="Task">
            <h2>User ID: {userID}</h2>
            <h3>Task ID: {taskID}</h3>
        </div>
    );
  }
}


class Step extends React.Component {
    render() {
        const { stepID } = this.props.params
        return (
            <div className="span3 sidebar">
                {this.props.children && React.cloneElement(this.props.children, {
                    data: this.props.data[stepID]
                })}
            </div>
        )
    }
}

class Wrapper extends React.Component {
    constructor (props) {
        super(props)
    }
    render() {
        return (
            <div className="wrapper">
                <Navbar/>
                <div className="main-content clearfix">
                    {this.props.children && React.cloneElement(this.props.children)}
                </div>
            </div>  
        )
    }
}

function redirectToChild(location, replaceState) {
    const step = location.params.stepID ? location.params.stepID : "safeSys"
    replaceState(null, '/create/step/' + step +'/node/1')
}

export default class appRoute extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" component={Wrapper}>
                    <IndexRoute component={Search} />
                    <Route path="search" component={Search} />
                    <Route path="login" component={Login} />
                    <Route path="reg" component={Reg} />
                    <Route path="cases" component={Cases} />
                    <Route path="create" component={Create}>
                        <IndexRoute onEnter={redirectToChild} />
                        <Route path="step/:stepID" component={Step}>
                            <IndexRoute onEnter={redirectToChild} />
                            <Route path="node/:nodeID" component={Sidebar} />
                        </Route>
                    </Route>
                    <Route path="products" component={Products} />
                    

                    <Route path="doc-generation/:docId" {...this.props} component={DocGeneration} />
                    <Route path="user/:userID" component={User}>
                        <Route path="tasks/:taskID" component={Task} />
                        <Redirect from="todos/:taskID" to="/user/:userID/tasks/:taskID" />
                    </Route>
                    <Route path="*" component={NoMatch}/>
                </Route>
            </Router>
        )
    }
}


// do not use history in IE
// const u = navigator.userAgent
// if (false && u.indexOf('Trident') > -1) {
//     React.render((
//         <Router>
//             <MyRouters/>
//         </Router>
//     ), document.getElementById('main'))
// } else {
    
// }


