import React, { Component, PropTypes } from 'react'
import { Router, Route, Link, Redirect } from 'react-router'
import _ from 'lodash'

import Req from '../mod/request'
import { Item } from './item.jsx';

class Sidebar extends React.Component {
    constructor () {
        super()
        this.state = { 
        }
    }
    componentDidMount () {
    }
    componentWillUnmount () {
    }

    save () {
        let formArr = _.toArray(this.refs.form)
        let answers = formArr.map((field)=> field.value )
        this.props.markAndSaveAnswers(answers)
    }

    render() {
        if (!this.props.parameters) {return (<i class="fa fa-spinner"></i>)}
        const nextPath = `/create/step/${this.props.ids.concat(0).join('-')}`
        return (
            <div className='navbar-inner'>
                <h3>{this.props.module.name}</h3>
                <form className='items form-horizontal' ref='form'>
                    { this.props.parameters.map((item,i)=> {
                        return <Item key={i} data={item} />
                    })}
                </form>
                <div className='bottom'>
                    <span className='btn btn-success next' onClick={this.save.bind(this)}>选择并保存</span>
                </div>
            </div>
        )
    }
}

class StepRow extends React.Component {
    constructor (props) {
        super(props)
        const showLen = 3
        this.state = {
            startIdx: 0,
            showLen: showLen,
            boxes: this.props.boxes,
            leftActive: false,
            rightActive: this.props.boxes.length > showLen
        }
    }

    prev () {
        if (this.state.leftActive) {
            const newStartIdx = --this.state.startIdx
            this.setState({
                leftActive: newStartIdx > 0,
                rightActive: this.props.boxes.length > this.state.showLen+ newStartIdx,
                startIdx: newStartIdx
            })
        }
    }

    next () {
        if (this.state.rightActive) {
            const newStartIdx = ++this.state.startIdx
            this.setState({
                leftActive: newStartIdx > 0,
                rightActive: this.props.boxes.length > this.state.showLen+ newStartIdx,
                startIdx: newStartIdx
            })
        }
    }

    makeLinkStr (i) {
        // get linkStr
        let idsClone = this.props.ids.slice()
        idsClone = idsClone.slice(0,this.props.step)
        idsClone.push(this.state.startIdx + i)
        return idsClone.join('-')
    }

    render () {
        if (!this.props.boxes || this.props.boxes.length == 0) return null
        let arrows = null
        if (this.props.boxes.length > this.state.showLen) {
            arrows = <span>
                <span className={`arrow fa fa-angle-left left ${this.state.leftActive ? 'active' : ''}`} onClick={this.prev.bind(this)}></span>
                <span className={`arrow fa fa-angle-right right ${this.state.rightActive ? 'active' : ''}`} onClick={this.next.bind(this)}></span>
            </span>
        }

        return (
            <div>
                <div className={`row-fluid row-step`}>
                    {this.props.boxes.slice(this.state.startIdx, this.state.startIdx + this.state.showLen).map(function (node, i) {
                        return (
                            <div className="span3" key={i}>
                                <Link to={`/solution-create/${this.makeLinkStr(i)}`} 
                                    className={i == this.props.ids[this.props.step]-this.state.startIdx ? 'active-light' : ''} 
                                    activeClassName="active">
                                    <img src={node.cover} className="cover" />
                                    <button className="btn">{node.name}</button>
                                </Link>
                            </div>
                        )
                    }.bind(this))}
                    {arrows}
                    <span className={`arrow fa fa-angle-down`}></span>
                </div>
            </div>
        )
    }
}

class Create extends React.Component {
    constructor (props) {
        super(props)
        let { id } = this.props.params
        this.state = {
            data: {},
            ids: id.split('-') 
        }
    }

    getParameters (data, ids) {
        const {loading, closing} = this.props.route.loading
        const module = ids.reduce((module, id)=> {
            return module.children[id]
        }, data)
        loading()
        // this.setState({
        //     loading: true
        // })
        Req.getParameter({module_id: module.id}, (newData)=> {
            this.setState({
                parameters: newData,
                module: module
                // loading: false
            })
            closing()
        }.bind(this))
    }

    componentDidMount () {
        Req.getModule({per_page: 1000}, (arr)=> {
            let newData = util.tierData(arr)
            const ids = this.props.params.id.split('-')  
            this.setState({
                data: newData
            })
            this.getParameters(newData, ids)
        }.bind(this))
    }

    componentWillReceiveProps (nextProps) {
        if (!(nextProps.params.id == this.props.params.id)) {
            const ids = nextProps.params.id.split('-')  
            this.setState({
                ids: ids
            })
            this.getParameters(this.state.data, ids)
        }
    }

    getLineData () {
        let rv = {children: []}
        let moduleArr = []
        this.state.ids.forEach((id)=> {

            module = data.children[id]
            rvModule = rv.children[0]
            rv.children[0] = {
                id: module.id,
                name: module.name,
                description: module.description,
                poster: module.poster,
                answers: module.answers,
                children: []
            }
        })
        return rv
    }

    createSolution () {
        // flatten & filter 'saved' modules
        let moduleArr = util.flattenData( _.cloneDeep(this.state.data.children) )
        moduleArr = _.filter(moduleArr, 'saved')
        if (!moduleArr.length) return alert('请先选择模块！')
        let tierData = util.tierData(moduleArr).children

        const data = {
            name: '新系统标题',
            description: '新系统描述',
            price_range: [1000, 99999],
            modules: tierData
        }
        console.log(data)
        Req.createSolution(data, (fb)=> {
            if (fb.id) {
                alert('创建成功！')
                window.location.assign("/solutions")
            }
        })
    }

    markAndSaveAnswers (answers) {
        // mark as saved
        let module = this.state.data
        this.state.ids.forEach((id)=> {
            module.children[id].saved = true
            module = module.children[id]
        })

        // save current answers
        module.answers = answers

        // module.answers
        this.setState({
            data: this.state.data
        })
    }

    render() {
        if (!this.state.module) return null
        const mainClassName= "row-fluid show-grid page-create step-" + this.state.ids[0] 
        let boxes = this.state.data.children
        return (
            <div className={mainClassName}>
                <div className="span9">
                    <div className="page-header">
                        <h1>xxx 方案 <span className='btn btn-success' onClick={this.createSolution.bind(this)}>生成</span></h1>
                    </div>
                    <StepRow ids={this.state.ids} boxes={boxes} parentBoxes={boxes} step={0} />
                    { this.state.ids.map(function(id, i){
                        boxes = boxes[id].children    
                        if (boxes)
                            return <StepRow ids={this.state.ids} boxes={boxes} key={i} len={boxes.length} step={i+1} />
                    }.bind(this))}
                </div>
                <div className="span3 sidebar">
                    <Sidebar module={this.state.module} markAndSaveAnswers={this.markAndSaveAnswers.bind(this)} parameters={this.state.parameters} ids={this.state.ids} />
                </div>
            </div>
        );
    }
}


export default Create

