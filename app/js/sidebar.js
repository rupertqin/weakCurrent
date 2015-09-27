import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

class Sidebar extends React.Component {
    render() {
        return (
            <div className="sidebar">
                <div className="navbar-inner">
                    {this.props.children}
                </div>
            </div>
        )
    }
}

export {Sidebar}