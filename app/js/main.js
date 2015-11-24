import React from 'react'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'
import { createHistory, useBasename } from 'history'

import "../scss/common.scss"

import { Data } from './data'
import { Search } from './search'
import { Reg } from './reg'
import { Navbar } from './navbar'
import { Create } from './create'
import { Sidebar } from './sidebar'
import { NoMatch } from './404'

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

function redirectToChild(location, replaceState) {
    const step = location.params.stepID ? location.params.stepID : "safeSys"
    replaceState(null, '/create/step/' + step +'/node/1')
}



class App extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    componentDidMount () {
        // ajax get data
        setTimeout(function () {
            window.Data = Data
            this.setState({
                data: window.Data
            })
        }.bind(this), 300)
    }
    render() {
        if (!this.state.data) return null
        return (
            <div className="wrapper">
                <Navbar/>
                <div className="main-content clearfix">
                    {this.props.children && React.cloneElement(this.props.children, {data: this.state.data })}
                </div>
            </div>  
        )
    }
}

React.render((
    <Router>
        <Route path="/" component={App}>
            <Route path="search" component={Search} />
            <Route path="reg" component={Reg} />
            <Route path="create" component={Create}>
                <IndexRoute onEnter={redirectToChild} />
                <Route path="step/:stepID" component={Step}>
                    <IndexRoute onEnter={redirectToChild} />
                    <Route path="node/:nodeID" component={Sidebar} />
                </Route>
            </Route>
            

            <Route path="user/:userID" component={User}>
                <Route path="tasks/:taskID" component={Task} />
                <Redirect from="todos/:taskID" to="/user/:userID/tasks/:taskID" />
            </Route>
            <Route path="*" component={NoMatch}/>
        </Route>
    </Router>
), document.getElementById('main'))


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


