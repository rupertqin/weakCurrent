import React from 'react'
import { Router, Route, Link, Redirect } from 'react-router'
import { createHistory, useBasename } from 'history'


const history = useBasename(createHistory)({
  basename: ''
})


import "../scss/common.scss"

import { Data } from './data'


import { Search } from './search'
import { Navbar } from './navbar'
import { Create } from './create'
import { Sidebar } from './sidebar'
import { NoMatch } from './404'



const User = React.createClass({
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
});

const Task = React.createClass({
  render() {
    var { userID, taskID } = this.props.params;

    return (
        <div className="Task">
            <h2>User ID: {userID}</h2>
            <h3>Task ID: {taskID}</h3>
        </div>
    );
  }
});


class Step extends React.Component {
    render() {
        return (
            <div>
                {this.props.children && React.cloneElement(this.props.children, {
                    arr: this.props.arr
                })}

          </div>
        )
    }
}

let ajaxData;

// do not use history in IE
const u = navigator.userAgent
if (u.indexOf('Trident') > -1) {
    React.render((
        <Router>
            <Route path="/" component={App}>
                <Route path="search" component={Search} />
                <Route path="create" component={Create}>
                    <Route path="step/:stepID">
                        <Route path="node/:nodeID" />
                    </Route>
                </Route>
                <Route path="user/:userID" component={User}>
                    <Route path="tasks/:taskID" component={Task} />
                    <Redirect from="todos/:taskID" to="/user/:userID/tasks/:taskID" />
                </Route>
            </Route>
        </Router>
    ), document.getElementById('main'));

} else {
    // ajax get data
    setTimeout(function(){
        ajaxData = Data
        const App = React.createClass({

            render() {
                return (
                    <div className="wrapper">
                        <Navbar/>
                        <div className="main-content clearfix">
                            {this.props.children && React.cloneElement(this.props.children, {
                                arr: ajaxData
                            })}
                        </div>
                    </div>  
                );
            }
        })

        React.render((
            <Router>
                <Route path="/" component={App}>
                    <Route path="search" component={Search} />
                    <Route path="create" component={Create}>
                        <Route path="step/:stepID" component={Step}>
                            <Route path="node/:nodeID" component={Sidebar} />
                        </Route>
                        <Redirect from="step/:stepID" to="/create/step/:stepID/node/1" />
                    </Route>
                    <Route path="user/:userID" component={User}>
                        <Route path="tasks/:taskID" component={Task} />
                        <Redirect from="todos/:taskID" to="/user/:userID/tasks/:taskID" />
                    </Route>
                    <Route path="*" component={NoMatch}/>
                </Route>
            </Router>
        ), document.getElementById('main'))
    }, 300)
}

