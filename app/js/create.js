import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

class Create extends React.Component {
    render() {
        const { safeSys, watcher, circuit, machinery } = this.props.data
        const { stepID, nodeID } = this.props.params
        const  mainClassName= "row-fluid show-grid page-create step-" + stepID

        return (
            <div className={mainClassName}>
                <div className="span9">
                    <div className="page-header">
                        <h1>xxx 方案</h1>
                    </div>
                    <div className="row-fluid row-step row-safeSys">
                        {safeSys.map(function (node, i) {
                            return (
                                <div className="span3" key={i}>
                                    <Link to={`/create/step/safeSys/node/${i+1}`} activeClassName="active">
                                        <img src={node.cover} className="cover" />
                                        <button className="btn" activeClassName="btn-success">{node.name}</button>
                                    </Link>
                                </div>
                            )
                        })}
                        <span className="icon-chevron-left"></span>
                        <span className="icon-chevron-right"></span>
                    </div>

                    <div className="row-fluid row-step row-watcher">
                        {watcher.map(function (node, i) {
                            return (
                                <div className="span3" key={i}>
                                    <Link to={`/create/step/watcher/node/${i+1}`} activeClassName="active">
                                        <img src={node.cover} className="cover" />
                                        <button className="btn">{node.name}</button>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>

                    <div className="row-fluid row-step row-circuit">
                        {circuit.map(function (node, i) {
                            return (
                                <div className="span3" key={i}>
                                    <Link to={`/create/step/circuit/node/${i+1}`} activeClassName="active">
                                        <img src={node.cover} className="cover" />
                                        <button className="btn">{node.name}</button>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>

                    <div className="row-fluid row-step row-machinery">
                        {machinery.map(function (node, i) {
                            return (
                                <div className="span3" key={i}>
                                    <Link to={`/create/step/machinery/node/${i+1}`} activeClassName="active">
                                        <img src={node.cover} className="cover" />
                                        <button className="btn">{node.name}</button>
                                    </Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
                {this.props.children && React.cloneElement(this.props.children, {data: this.props.data })}
            </div>
        );
    }
}

export {Create}