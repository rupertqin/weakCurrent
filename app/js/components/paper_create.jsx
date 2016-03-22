import React, { PropTypes, Component } from 'react'
import ReactUpdate from 'react-addons-update'
import { Router, Route, Link, Redirect } from 'react-router'
import classnames from 'classnames'
import linkState from 'react-link-state'
import _ from 'lodash'

import Req from '../mod/request'
import { Item } from './item.jsx';

class SideBar extends Component {
    constructor (props, context) {
        super(props, context)
        this.state = {
            
        }
    }
    componentWillReceiveProps (nextProps) {
        this.setState({data: nextProps.data})
    }
    // shouldComponentUpdate (nextProps, nextState) {
    //     return !!(nextProps.item && nextProps.item.name !== undefined)
    // }

    changeTextArae (e) {
        const text = typeof e == 'object' ? e.target.value : e
        let item
        if (this.state.item.editType == 'title') {
            this.state.item.name = text
            item = ReactUpdate(this.state.item, {name: {$set: text}})
        } else {
            this.state.item.content = text
            item = ReactUpdate(this.state.item, {content: {$set: text}})
        }
        this.setState({item: item})
    }

    changeFillIn (question, i, e) {
        const text = typeof e == 'object' ? e.target.value : e
        let questionObj = {}
        questionObj[i] = {value:  {$set: text}}
        let item = ReactUpdate(this.state.item, {questions: questionObj})
        this.setState({
            item: item
        })
    }

    replaceWithInput (question, i) {
        let text = question.text.split('<>')
        return (<div>
            {text[0]} 
            <input type="text" 
                value={question.value} 
                onChange={this.changeFillIn.bind(this, question, i)}
                id={"inputWarning" + i} />  
            {text[1]}
        </div>)
    }

    handleSave (e) {
        e.preventDefault()
        let saveFn
        switch (this.state.editKey) {
            case 'title':
                this.props.save(this.state.data)
                break;
            case 'description':
                this.props.save(this.state.data)
                break;
            default:
                for (var key in this.state.data.params) {
                    this.state.data.params[key].answer = this.refs.form[key].value
                }
                this.props.save(this.state.data)
        }
    }

    choose (i, question, j) {
        let questionObj = {}
        questionObj[i] = {value:  {$set: j}}
        let data= ReactUpdate(this.state.data, {questions: questionObj})
        this.setState({
            data: data
        })
    }

    render() {
        if (!this.props.data) return null
        let tpl
        switch (this.props.editKey) {
            case 'title':
                tpl = <div>
                    <h4>标题</h4>
                    <div>
                        <textarea rows="8" 
                            valueLink={linkState(this, 'data')}
                            ref='newTxt' />
                    </div>
                </div>
                break;

            case 'description':
                tpl = <div>
                    <div>
                        <textarea rows="8" 
                            valueLink={linkState(this, 'data')}
                            ref='newTxt' />
                    </div>
                </div>
                break;

            default:
                tpl = <div>
                    { Object.keys(this.state.data.params).map(function (key, i) {
                        let param = this.state.data.params[key]
                        let questionDom
                        if (param.type == "text") {
                            questionDom = (
                                <div className="control-group" key={i}>
                                    <label className="control-label ellipsis">{key}</label>
                                    <div className="controls">
                                        <input type="text" name={key} defaultValue={param.answer} />
                                    </div>
                                </div>
                            )

                        } else if (param.type == "select") {
                            questionDom = (
                                <div className="control-group" key={i}>
                                    <label className="control-label ellipsis">{key}</label>
                                    <div className="controls">
                                        <select name={key} defaultValue={param.answer}>
                                            {param.options.map(function (value, j) {
                                                return (
                                                    <option name={`optionsRadios`} value={value} key={j}>
                                                        {value}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                    </div>
                                </div>
                            )
                        }
                        return questionDom;
                    }.bind(this))}
                </div>
        }

        return (
            <div className={classnames({'side-bar span3': true,'hide': !this.props.isSideBarOpen})}>
                <div className="inner">
                    <form className="form-horizontal" onSubmit={this.handleSave.bind(this)} ref="form">
                        {tpl}
                        <div className="bottom">
                            <button className="btn btn-success btn-small">保存</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

SideBar.propTypes = {
    isSideBarOpen: PropTypes.bool,
    save: PropTypes.func.isRequired
}


class ItemY extends Component {
    constructor (props, context) {
        super(props, context)
    }
    render() {
        return (
            <div className="item">
                <h3>
                    {this.props.data.name} 
                    <button className="btn btn-mini btn-success"
                            onClick={this.props.edit}
                    >编辑</button>
                </h3>
                <div className="" dangerouslySetInnerHTML={{__html: this.props.data.description}}></div>
            </div>
        )
    }
}

ItemY.propTypes = {
    data: PropTypes.object.isRequired
}


class PaperCreate extends Component {
    constructor (props){
        super(props)
        let { sId, tId } = this.props.params
        this.state = {
            sId: sId,
            tId: tId,
            isSideBarOpen: false,
            question: undefined
        }
    }

    componentDidMount (){
        Req.getTemplate(this.state.tId, (data)=> {
            this.setState({
                data: data 
            })
        })
    }

    edit (key, item, idx){
        this.setState({
            isSideBarOpen: true,
            editKey: key,
            question: item,
            idx: idx
        })
    }

    getSectionTrueText (section){
        let rv = section.text
        for (var key in section.params){
            let answer = section.params[key].answer
            if (!answer) continue;
            let p = new RegExp(`{{ ${key} }}`, 'g')
            rv = rv.replace(p, `<span class="param">${answer}</span>`)
        }
        return `<span>${rv}</span>`
    }

    save (item) {
        let newData
        let setObj = {}
        switch (this.state.editKey) {
            case 'title':
                newData = ReactUpdate(this.state.data, {title: {$set: item}})
                break;
            case 'description':
                setObj[this.state.editKey] = {$set: item}
                newData = ReactUpdate(this.state.data, setObj)
                break;
            default:
                this.state.data.sections[this.state.idx] = item
                newData = this.state.data
        }
        this.setState({
            data: newData,
            isSideBarOpen: false
        })
    }

    create () {
        this.state.data.template = {id: this.state.tId}
        this.state.data.solution = {id: this.state.sId}
        this.state.data.sections = this.state.data.sections.map((section)=> {
            for (var key in section.params){
                if (!section.params[key].answer) {
                    section.params[key] = '';
                } else {
                    section.params[key] = section.params[key].answer
                }

            }        
            return section
        })
        Req.createPaper(this.state.data, (fb)=> {
            if (fb.id) {
                alert('保存文书成功')
            }
        })
    }

    render() {
        if (!this.state.data) return null

        const { generation, incrementIfOdd, incrementAsync, decrement, counter } = this.props.route
        let data = this.state.data
        return (
            <div className="page-paper-create"> 
                <header className="row-fluid">
                    <div className="span3"><h1>文书生成</h1></div>
                    <div className={'span2 ' + (this.state.isSideBarOpen ? 'offset4' : 'offset7')}>
                        <Link className="btn btn-mini btn-success" to="/login">打印</Link>
                        <span className="btn btn-mini btn-success" onClick={this.create.bind(this)}>保存文书</span>
                    </div>
                </header>
                <div className="container row-fluid">
                    <div className={this.state.isSideBarOpen ? 'span9' : ''}>
                        <div className="section">
                            <h2>
                                {data.title}
                                <button className="btn btn-mini btn-success" 
                                        onClick={this.edit.bind(this, 'title', data.title)}
                                >编辑</button>
                            </h2>
                        </div> 
                        <div className="section">
                            <h3>
                                文书描述：
                                <button className="btn btn-mini btn-success"
                                        onClick={this.edit.bind(this, 'description', data.description)}
                                >编辑</button>
                            </h3>
                            <div className="">{data.description}</div>
                        </div>
                        { this.state.data.sections.map((section,i)=> {
                            return <div className="section" key={i}>
                                <h3>
                                    Section: 
                                    <button className="btn btn-mini btn-success"
                                            onClick={this.edit.bind(this, 'sections', section, i)}
                                    >编辑</button>
                                </h3>
                                <div className="" dangerouslySetInnerHTML={{__html: this.getSectionTrueText(section)}} />
                            </div>
                        })}
                    </div>
                    <SideBar isSideBarOpen={this.state.isSideBarOpen} save={this.save.bind(this)} editKey={this.state.editKey} data={this.state.question} />
                </div>
            </div> 
        )
    }
}

export default PaperCreate

