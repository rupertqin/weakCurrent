import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

class Reg extends React.Component {
    constructor () {
        super()
    }
    render() {
        const items = this.props.items
        return (
            <div> 
                <header className="row-fluid">
                    <div className="span6"></div>
                    <div className="span2 offset4">
                        <Link to="/login">登录</Link>/
                        <Link to="/reg">注册</Link>
                    </div>
                </header>
                <form className="form-horizontal box">
                    <h3>新用户注册</h3>
                    <div className="control-group">
                        <label className="control-label" htmlFor="inputEmail">用户名：</label>
                        <div className="controls">
                            <input type="text" id="inputEmail" placeholder="邮箱/手机" />
                        </div>
                    </div>
                    <div className="control-group">
                        <label className="control-label" htmlFor="inputPassword">登录密码：</label>
                        <div className="controls">
                            <input type="password" id="inputPassword" />
                        </div>
                    </div>
                    <div className="control-group">
                        <label className="control-label" htmlFor="inputPassword">重复密码：</label>
                        <div className="controls">
                            <input type="password" id="inputPassword" />
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
                            <button type="submit" className="btn btn-success">注册</button>
                            <button type="reset" className="btn btn-success">重置</button>
                        </div>
                    </div>
                </form> 
            </div> 
        )
    }
}

export default Reg

