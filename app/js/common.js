import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import "../scss/common.scss";

import { Search } from './search.js';
import { Navbar } from './navbar.js';

var App = React.createClass({

    render() {
        return (
            <div className="wrapper">
                <Navbar/>
                <div className="main-content">
                    {this.props.children}
                </div>
            </div>
        );
    }
});

var User = React.createClass({
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

var Task = React.createClass({
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

React.render((
    <Router>
        <Route path="/" component={App}>
            <Route path="search" component={Search} />
            <Route path="user/:userID" component={User}>
                <Route path="tasks/:taskID" component={Task} />
                <Redirect from="todos/:taskID" to="/user/:userID/tasks/:taskID" />
            </Route>
        </Route>
    </Router>
), document.getElementById('main'));
