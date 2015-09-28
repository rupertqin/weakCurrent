import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

class Sidebar extends React.Component {
    render() {
        console.log("sidebar: ", this.props.arr, this.props.params)
        const { stepID, nodeID } = this.props.params
        if (this.props.arr) {
            const { safeSys } = this.props.arr
            return (
                <div className="sidebar">
                    <div className="navbar-inner">
                        <h3>{safeSys[nodeID-1].name}</h3>
                        <a className="btn" href="#">{safeSys[nodeID-1].sidebar}</a>
                    </div>
                </div>
            )
        }
    }
}

export {Sidebar}