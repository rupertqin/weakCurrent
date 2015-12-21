import React from 'react';

import { Router, Route, Link, Redirect } from 'react-router';

class Login extends React.Component {
    constructor () {
        super()
    }
    render() {
        const items = this.props.items
        return (
            <form className="form-horizontal box">
                <h3>登录</h3>
                <div className="control-group">
                    <label className="control-label" htmlFor="inputEmail">用户名：</label>
                    <div className="controls">
                        <input type="text" id="inputEmail" placeholder="用户名" />
                    </div>
                </div>
                <div className="control-group">
                    <label className="control-label" htmlFor="inputPassword">密码：</label>
                    <div className="controls">
                        <input type="password" id="inputPassword" placeholder="密码" />
                        <Link to={`/forget`}>忘记密码</Link>
                    </div>
                </div>
                <div className="control-group">
                    <label className="control-label" htmlFor="inputPassword">验证码：</label>
                    <div className="controls">
                        <input className="input-small" type="text" id="inputPassword" placeholder="" />
                        <img src="img/captcha.jpg"/>
                    </div>
                </div>
                <div className="control-group">
                    <div className="controls">
                        <button type="submit" className="btn btn-success">登录</button>
                    </div>
                </div>
            </form> 
        )
    }
}

export default {Login}

