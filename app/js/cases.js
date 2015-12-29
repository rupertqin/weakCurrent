import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import _ from 'lodash'

class Box extends React.Component {
    constructor () {
        super()
    }
    render() {
        return (
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
        )
    }
}

class Case extends React.Component {
    constructor () {
        super()
    }
    render() {
        return (
            <div className="row">
                <h2>xx楼宇设计方案</h2>
                <div className="scroll">
                    {_.range(8).map((node, i) => <Box></Box> )}
                </div>
                <div className="board">
                    <h4>描述</h4>
                    <p className="des">建设xx楼宇项目，包含xx系统、xx系统等</p>
                    <p className="price">预估价格<br/>9999元</p>
                    <div>
                        <button className="btn btn-success">编辑</button>
                        <button className="btn btn-success">生成文书</button>
                    </div>
                </div>
            </div>
        )
    }
}

class Cases extends React.Component {
    constructor () {
        super()
    }
    render() {
        return (
            <div className="page-cases"> 
                <header className="row-fluid">
                    <div className="span3"><h1>方案列表</h1></div>
                </header>
                <div className="container">
                    <form>
                        <div className="input-append">
                            <input className="span3" id="" type="text"/>
                            <button className="btn btn-success" type="button">
                                <i className="icon-search icon-white"></i> 搜索
                            </button>
                        </div>
                    </form> 
                    {_.range(3).map((node, i) => <Case></Case> )}
                </div> 
            </div> 
        )
    }
}

export default Cases

