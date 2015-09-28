import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

import { Data } from './data'
import { Sidebar } from './sidebar';

const Create = React.createClass({
    render() {
        const { stepID, nodeID } = this.props.params
        let show2 = "row-fluid "
        if (stepID != "2") {
            show2 += "hide"
        }
        console.log(Data)
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
                    <Sidebar>
                        <h1>安防系统</h1>
                        <Link to="/create/step/2" className="btn">选择子模块</Link>
                    </Sidebar>
                </div>
            </div>
        );
    }
});

export {Create}