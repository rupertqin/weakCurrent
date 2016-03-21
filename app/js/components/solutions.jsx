import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import linkState from 'react-link-state'
import _ from 'lodash'

import Req from '../mod/request'

class Box extends React.Component {
    constructor () {
        super()
    }
    render() {
        let priceTxt = ''
        if (this.props.data.priceRange) {
            priceTxt = this.props.data.priceRange[0] + '~' + this.props.data.priceRange[0] + '元'
        }
        return (
            <div className="box">
                <h3>{this.props.data.name}</h3>
                <ul>
                    <li>{this.props.data.description}</li>
                </ul>
                <span className="price">{priceTxt}</span>
            </div>
        )
    }
}

class Solution extends React.Component {
    constructor () {
        super()
        this.state = {
            isDropDownMenuOpen: false
        }
    }

    toggle (){
        this.setState({
            isDropDownMenuOpen: !this.state.isDropDownMenuOpen
        })
    }

    render() {
        const data = this.props.data
        return (
            <div className="row">
                <h2>{this.props.data.name}</h2>
                <div className="mod-scroll">
                    {this.props.data.modules.map((sy,i) => <Box key={i} data={sy}></Box> )}
                </div>
                <div className="board">
                    <h4>描述</h4>
                    <p className="des">{this.props.data.description}</p>
                    <div className="bottom">
                        <p className="price">预估价格<br/>{this.props.data.price_least}~{this.props.data.price_most}元</p>
                        <Link to={`/solution/${this.props.data.id}/edit`} className="btn btn-success">编辑</Link>
                        <div className={`btn-group ${this.state.isDropDownMenuOpen ? 'open':''}`}>
                            <span className="btn dropdown-toggle btn-success" href="#" onClick={this.toggle.bind(this)}>
                                生成文书
                                <span className="caret"></span>
                            </span>
                            <ul className="dropdown-menu">
                                { this.props.templates.map((tpl, i)=> {
                                    return <li key={tpl.id}>
                                        <Link to={`/paper-create/${this.props.data.id}-${tpl.id}`} className="btn btn-success">
                                            模板：{tpl.title}
                                        </Link>
                                    </li>
                                })}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default class Solutions extends React.Component {
    constructor (props){
        super(props)
        this.state = {
        }
    }

    componentDidMount (){
        Req.getSolutionList({}, function(newData) {
            this.setState({
                solutions: util.flattenSolutions(newData)
            })
        }.bind(this))
        
        Req.getTemplateList(function(data) {
            this.setState({
                templates: data
            })
        }.bind(this))
    }

    search (e){
        e.preventDefault()
        Req.getSolutionList({keyword: this.refs.keyword.value}, function(newData) {
            this.setState({
                solutions: util.flattenSolutions(newData)
            })
        }.bind(this))
    }

    render (){
        if (!this.state.solutions || !this.state.templates) return null

        return (
            <div className="page-solutions"> 
                <header className="row-fluid">
                    <div className="span3"><h1>方案列表</h1></div>
                </header>
                <div className="container">
                    <form onSubmit={this.search.bind(this)}>
                        <div className="input-append">
                            <input className="span3" id="" ref="keyword" type="text"/>
                            <button className="btn btn-success" type="submit">
                                <i className="icon-search icon-white"></i> 搜索
                            </button>
                        </div>
                    </form> 
                    {this.state.solutions.map((cs,i) => <Solution key={i} templates={this.state.templates} data={cs}></Solution>)}
                </div> 
            </div> 
        )
    }
}


