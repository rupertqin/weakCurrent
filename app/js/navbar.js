import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

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
                            <div className="nav-collapse in collapse">
                                <ul className="nav">
                                    <li className="">
                                        <a href="./index.html">Home</a>
                                    </li>
                                    <li className="">
                                        <a href="./getting-started.html">Get started</a>
                                    </li>
                                    <li className="">
                                        <a href="./scaffolding.html">Scaffolding</a>
                                    </li>
                                    <li className="active">
                                        <a href="./base-css.html">Base CSS</a>
                                    </li>
                                    <li className="">
                                        <a href="./components.html">Components</a>
                                    </li>
                                    <li className="">
                                        <a href="./javascript.html">JavaScript</a>
                                    </li>
                                    <li className="">
                                        <a href="./customize.html">Customize</a>
                                    </li>
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