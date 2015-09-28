import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

const Create = React.createClass({
    render() {
        console.log(this.props.arr)
        const { stepID, nodeID } = this.props.params
        let show2 = "row-fluid "
        if (stepID != "2") {
            show2 += "hide"
        }
        return (
            <div className="row-fluid show-grid">
                <div className="span9">
                    <div className="page-header">
                        <h1>xxx 方案{stepID}{nodeID}</h1>
                    </div>
                    <div className="row-fluid">
                        <div className="span3">
                            <Link to="/create/step/1/node/1">
                                <img src="img/cover.jpg" />
                                <button className="btn">安防系统</button>
                            </Link>
                        </div>
                        <div className="span3">
                            <Link to="/create/step/1/node/2">
                                <img src="img/cover.jpg" />
                                <button className="btn">安防系统</button>
                            </Link>
                        </div>
                        <div className="span3">
                            <Link to="/create/step/1/node/3">
                                <img src="img/cover.jpg" />
                                <button className="btn">安防系统</button>
                            </Link>
                        </div>
                        <div className="span3">
                            <Link to="/create/step/1/node/4">
                                <img src="img/cover.jpg" />
                                <button className="btn">安防系统</button>
                            </Link>
                        </div>
                    </div>


                    <div className={show2}>
                        <div className="span3">
                            <Link to="/create/step/1/node/1">
                                <img src="img/cover.jpg" />
                                <button className="btn">安防系统</button>
                            </Link>
                        </div>
                        <div className="span3">
                            <Link to="/create/step/1/node/1">
                                <img src="img/cover.jpg" />
                                <button className="btn">安防系统</button>
                            </Link>
                        </div>
                        <div className="span3">
                            <Link to="/create/step/1/node/1">
                                <img src="img/cover.jpg" />
                                <button className="btn">安防系统</button>
                            </Link>
                        </div>
                        <div className="span3">
                            <Link to="/create/step/1/node/1">
                                <img src="img/cover.jpg" />
                                <button className="btn">安防系统</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="span3">
                    {this.props.children && React.cloneElement(this.props.children, {
                        arr: this.props.arr
                    })}
                </div>
            </div>
        );
    }
});

export {Create}