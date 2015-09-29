import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

class Sidebar extends React.Component {
    render() {
        console.log("sidebar: ", this.props.data, this.props.params)
        const { stepID, nodeID } = this.props.params
        if (this.props.data) {
            const data = this.props.data[nodeID-1]
            return (
                <div className="sidebar">
                    <div className="navbar-inner">
                        <h3>{data.name}</h3>
                        <a className="btn" href="#">{data.sidebar}</a>
                    </div>
                </div>
            )
        }
    }
}

export {Sidebar}