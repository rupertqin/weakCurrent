import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import { Button } from 'react-bootstrap';

const buttonsInstance = (
    <Button>Default</Button>

);
var Buttons = React.createClass({
    render() {
        return  buttonsInstance
    }
})

var Search = React.createClass({
  render() {
    return (
      <div className="page-search">
        <ul>
          <li><Link to="/user/123">Bob</Link></li>
          <li><Link to="/user/abc">Sally</Link></li>
        </ul>
        <Buttons />
        <img src="img/logo.jpg" />
        <div className="control-group">
            <div className="controls">
                <div className="input-prepend">
                    <span className="add-on"><i className="icon-search"></i></span>
                    <input className="span2" type="text" />
                </div>
            </div>
        </div>
        <div className="control-label">
            <small> Email address </small>
        </div>
        {this.props.children}
      </div>
    );
  }
});

export {Search};