import React from 'react'
import { Router, Route, Link, Redirect } from 'react-router'
import _ from 'lodash'

import Req from '../mod/request'
import { Items } from './items.jsx';

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

    render() {
        if (!this.props.parameters) {return (<i class="fa fa-spinner"></i>)}
        const nextPath = `/create/step/${this.props.ids.concat(0).join('-')}`
        return (
            <div className='navbar-inner'>
                <h3>{this.props.module.name}</h3>
                <Items items={this.props.parameters} />
                <div className='bottom'>
                    <Link className='btn btn-success next' to={nextPath}>选择子模块</Link>
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
                                <Link to={`/create/${this.makeLinkStr(i)}`} className={i == this.props.ids[this.props.step]-this.state.startIdx ? 'active-light' : ''} activeClassName="active">
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

export default class extends React.Component {
    constructor (props) {
        super(props)
        let { id } = this.props.params
        this.state = {
            data: {},
            ids: id.split('-') 
        }
    }

    tierData (arr) {
        let root =  {}
        function findChildren(node){
            for (let i=0; i< arr.length;i++) {
                if (!arr[i].parent_id || arr[i].parent_id == node.id) { 
                    if (!node.children) node.children = [] 
                    node.children.push(arr[i])
                    arr.splice(i, 1)
                    i--
                }
            }
            if (node.children) {
                for (var i = 0; i < node.children.length; i++) {
                    findChildren(node.children[i])
                }
            }
        }
        findChildren(root)    
        return root
    }

    getParameters (data, ids) {
        const module = ids.reduce((module, id)=> {
            return module.children[id]
        }, data)
        this.setState({
            loading: true
        })
        Req.getParameter({module_id: module.id}, (newData)=> {
            this.setState({
                parameters: newData,
                module: module,
                loading: false
            })
        }.bind(this))
    }

    componentDidMount () {
        Req.getModule({}, (arr)=> {
            let newData = this.tierData(arr)
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

    render() {
        if (!this.state.module) return null
        const mainClassName= "row-fluid show-grid page-create step-" + this.state.ids[0] 
        let boxes = this.state.data.children
        return (
            <div className={mainClassName}>
                <div className="span9">
                    <div className="page-header">
                        <h1>xxx 方案</h1>
                    </div>
                    <StepRow ids={this.state.ids} boxes={boxes} parentBoxes={boxes} step={0} />
                    { this.state.ids.map(function(id, i){
                        boxes = boxes[id].children    
                        if (boxes)
                            return <StepRow ids={this.state.ids} boxes={boxes} key={i} len={boxes.length} step={i+1} />
                    }.bind(this))}
                </div>
                <div className="span3 sidebar">
                    <Sidebar module={this.state.module} parameters={this.state.parameters} ids={this.state.ids} />
                </div>
                <div className={`loading ${this.state.loading ? '' : 'hide'}`}><i className="fa fa-spinner"></i></div>
            </div>
        );
    }
}

