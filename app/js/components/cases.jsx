import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import _ from 'lodash'

import Req from '../mod/request'

class Box extends React.Component {
    // constructor () {
    //     super()
    // }
    render() {
        return (
            <div className="box">
                <h3>{this.props.data.name}</h3>
                <ul>
                    {this.props.data.descriptions.map((des,i) => <li key={i}>{des}</li> )} 

                </ul>
                <span className="price">{this.props.data.price}元</span>
            </div>
        )
    }
}

class Case extends React.Component {
    constructor () {
        super()
    }
    render() {
        const data = this.props.data
        return (
            <div className="row">
                <h2>{this.props.data.name}</h2>
                <div className="mod-scroll">
                    {this.props.data.systems.map((sy,i) => <Box key={i} data={sy}></Box> )}
                </div>
                <div className="board">
                    <h4>描述</h4>
                    <p className="des">{this.props.data.description}</p>
                    <div className="bottom">
                        <p className="price">预估价格<br/>{this.props.data.price}元</p>
                        <button className="btn btn-success">编辑</button>
                        <Link to={`/doc-generation/${this.props.data.id}/`} className="btn btn-success">生成文书</Link>
                    </div>
                </div>
            </div>
        )
    }
}

class Cases extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    componentDidMount () {
        // ajax get data
        setTimeout(()=> {
            let data = Req.getCasesData()
            console.log(data)
            this.setState({
                cases: data.cases
            })
        }, 300)
    }
    render() {
        if (!this.state.cases) return null

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
                    {this.state.cases.map((cs,i) => <Case key={i} data={cs}></Case> )}
                </div> 
            </div> 
        )
    }
}

export default Cases

