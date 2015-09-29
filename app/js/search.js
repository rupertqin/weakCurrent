import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

var Buttons = React.createClass({
    render() {
        return  (
            <div>
                <button className="btn btn-success" type="button">搜索</button>
                <Link className="btn btn-success" to="/create">新建</Link>
            </div>

        )
    }
})

var Search = React.createClass({
  render() {
    return (
      <div className="page-search">
        <div>
            <img src="img/logo.jpg" />
        </div>
        <div className="input-prepend">
            <span className="add-on"><i className="icon-search"></i></span>
            <input className="span2" type="text" />
        </div>
        <div className="control-label">
            <small>搜索项目名称、产品名称等</small>
        </div>
        <Buttons />
        {this.props.children}
      </div>
    );
  }
})

export {Search}