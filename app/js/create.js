import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

import { Sidebar } from './sidebar';

var Create = React.createClass({

    render() {
        return (
            <div className="row-fluid show-grid">
                <div className="span9">
                    <div className="page-header">
                        <h1>xxx 方案</h1>
                    </div>
                </div>
                <div className="span3">
                    <Sidebar>
                        <h1>安防系统</h1>
                    </Sidebar>
                </div>
            </div>
        );
    }
});

export {Create}