import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

var Search = React.createClass({
  render() {
    return (
      <div id="search">
        <ul>
          <li><Link to="/user/123">Bob</Link></li>
          <li><Link to="/user/abc">Sally</Link></li>
        </ul>
        <img src="img/logo.jpg" />
        <div className="control-group">
            <div className="controls">
                <div className="input-prepend">
                    <span className="add-on"><i className="icon-search"></i></span>
                    <input className="span2" id="inputIcon" type="text" />
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