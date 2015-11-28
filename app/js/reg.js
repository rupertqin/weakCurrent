import React from 'react';

import { Router, Route, Link, Redirect } from 'react-router';

class Reg extends React.Component {
    constructor () {
        super()
    }
    replaceWithInput (context, i) {
        var html = context.replace('<>', '<input type="text" value="" id="inputWarning' + i + '" />')
        return {__html: html}
    }
    render() {
        const items = this.props.items
        return (
            <form className="form-horizontal">
                <div className="control-group">
                    <label className="control-label" htmlFor="inputEmail">Email</label>
                    <div className="controls">
                        <input type="text" id="inputEmail" placeholder="Email" />
                    </div>
                </div>
                <div className="control-group">
                    <label className="control-label" htmlFor="inputPassword">Password</label>
                    <div className="controls">
                        <input type="password" id="inputPassword" placeholder="Password" />
                    </div>
                </div>
                <div className="control-group">
                    <div className="controls">
                        <label className="checkbox">
                            <input type="checkbox" /> Remember me
                        </label>
                        <button type="submit" className="btn">Sign in</button>
                    </div>
                </div>
            </form> 
        )
    }
}

export {Reg} 

