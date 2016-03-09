import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import { createHistory, useBasename } from 'history'

class Navbar extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
          menuOpen : false
        }
    }
    handleClick () {
        this.setState({ menuOpen: !this.state.menuOpen })
    }
    componentDidMount () {

    }
    render() {
        var navStr = 'navbar navbar-fixed-top navbar-fixed-bottom';
        if (!this.state.menuOpen) navStr += ' hide'
        return (
            <div className="">
                <div className="open-menu navbar-fixed-top navbar">
                    <button onClick={this.handleClick.bind(this)} type="button" className="btn btn-navbar">
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                        <span className="icon-bar"></span>
                    </button>
                </div>
                <div className={navStr}>
                    <div className="navbar-inner">
                        <div className="container">
                            <button onClick={this.handleClick.bind(this)} type="button" className="btn">
                                <i className="icon-remove"></i>
                            </button>
                            <div className="logo">
                                <img src="img/logo-s.jpg" />
                            </div>
                            <div className="nav-collapse in collapse">
                                <ul className="nav">
                                    <li><Link to="/search" activeClassName="active">首页</Link></li>
                                    <li><Link to="/solutions">我的方案</Link></li>
                                    <li><Link to="/">知识库</Link></li>
                                    <li><Link to="/">新闻中心</Link></li>
                                    <li><Link to="/">关于我们</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export {Navbar}
