import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

const Create = React.createClass({
    render() {
        console.log(this.props.arr)
        const { safeSys, watcher } = this.props.arr
        const { stepID, nodeID } = this.props.params
        const  mainClassName= "row-fluid show-grid step_" + stepID

        return (
            <div className={mainClassName}>
                <div className="span9">
                    <div className="page-header">
                        <h1>xxx 方案{stepID}{nodeID}</h1>
                    </div>
                    <div className="row-fluid">

                        {safeSys.map(function (node, i) {
                            return (
                                <div className="span3">
                                    <Link to={`/create/step/1/node/${i+1}`}>
                                        <img src={node.cover} />
                                        <button className="btn">{node.name}</button>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>

                    <div className="row-fluid">
                        {watcher.map(function (node, i) {
                            return (
                                <div className="span3">
                                    <Link to={`/create/step/2/node/${i+1}`}>
                                        <img src={node.cover} />
                                        <button className="btn">{node.name}</button>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {this.props.children && React.cloneElement(this.props.children, {arr: this.props.arr })}
            </div>
        );
    }
});

export {Create}