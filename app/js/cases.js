import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

class Cases extends React.Component {
    constructor () {
        super()
    }
    render() {
        const items = this.props.items
        return (
            <div className="page-cases"> 
                <header className="row-fluid">
                    <div className="span3"><h1>方案列表</h1></div>
                </header>
                <div className="container">
                    <form>
                        <div className="input-append">
                            <input className="span4" id="" type="text"/>
                            <button className="btn btn-success" type="button">
                                <i className="icon-search icon-white"></i> 搜索
                            </button>
                        </div>
                    </form> 
                    <div className="row">
                        <h2>xx楼宇设计方案</h2>
                        <div className="box">
                            <h3>p安防系统</h3>
                            <p>
                                1080P 480TVL<br/>
                                CMOS  1/4枪式摄像机<br/>
                                数字摄像机 一体机<br/>
                                一般亮度 DC驱动<br/>
                                C 接口 DC12V高速
                            </p>
                            <span>9999元</span>
                        </div>
                    </div>
                </div> 
            </div> 
        )
    }
}

export default Cases

