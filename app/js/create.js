import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

const Create = React.createClass({
    render() {
        console.log(this.props.arr)
        const { safeSys, watcher, circuit, machinery } = this.props.arr
        const { stepID, nodeID } = this.props.params
        const  mainClassName= "row-fluid show-grid step_" + stepID

        return (
            <div className={mainClassName}>
                <div className="span9">
                    <div className="page-header">
                        <h1>xxx 方案</h1>
                    </div>
                    <div className="row-fluid">

                        {safeSys.map(function (node, i) {
                            return (
                                <div className="span3">
                                    <Link to={`/create/step/safeSys/node/${i+1}`}>
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
                                    <Link to={`/create/step/watcher/node/${i+1}`}>
                                        <img src={node.cover} />
                                        <button className="btn">{node.name}</button>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>

                    <div className="row-fluid">
                        {circuit.map(function (node, i) {
                            return (
                                <div className="span3">
                                    <Link to={`/create/step/circuit/node/${i+1}`}>
                                        <img src={node.cover} />
                                        <button className="btn">{node.name}</button>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>

                    <div className="row-fluid">
                        {machinery.map(function (node, i) {
                            return (
                                <div className="span3">
                                    <Link to={`/create/step/machinery/node/${i+1}`}>
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