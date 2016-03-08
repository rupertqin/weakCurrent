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
        this.state = {
            startIdx: 0,
            boxes: this.props.boxes,
            shownBoxes: this.props.boxes.slice(0,4)       
        }
    }

    syncProps () {
        if (this.props.boxes) {
            this.setState({
                boxes: this.props.boxes,
                shownBoxes: this.props.boxes
            })
        } else {
            // if r, root module
            let parent_nth = this.props.ids[this.props.step - 1]
            let parent_id = parent_nth == 'r' ? '' : this.props.parentBoxes[parent_nth].id
            Req.getModule({parent_id: parent_id}, function(data){
                console.log(data)
                this.setState({
                    boxes: data,
                    shownBoxes: data.slice(0,4)
                })
            }.bind(this))
        }
    }

    // componentDidMount () {
    //     this.syncProps() 
    // }

    next () {
        const len = this.state.boxes.length
        let sIdx = this.state.startIdx
        if (sIdx + 4 <= len -1) {
            let newSIdx = ++this.state.startIdx
            this.setState({shownBoxes: this.state.boxes.slice(newSIdx, newSIdx + 4)})
        }
    }

    prev () {
        const len = this.state.boxes.length
        let sIdx = this.state.startIdx
        if (sIdx > 0) {
            let newSIdx = --this.state.startIdx
            this.setState({shownBoxes: this.state.boxes.slice(newSIdx, newSIdx + 4)})
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
        let leftActive = ''
        let rightActive = ''
        let hide = ''

        if (this.props.boxes.length <= 4) {
            hide = " hidden "
        } else {
            if (this.props.startIdx > 0) {
                leftActive = " active "
            } 
            if (this.props.startIdx + 4 < this.props.boxes.length ) {
                rightActive = " active "
            }
        }
        
        return (
            <div>
                <div className={`row-fluid row-step`}>
                    {this.props.boxes.slice(0, 4).map(function (node, i) {
                        return (
                            <div className="span3" key={i}>
                                <Link to={`/create/${this.makeLinkStr(i)}`} activeClassName="active">
                                    <img src={node.cover} className="cover" />
                                    <button className="btn">{node.name}</button>
                                </Link>
                            </div>
                        )
                    }.bind(this))}
                    <span className={`arrow fa fa-angle-left left ${leftActive} ${hide}`} onClick={this.prev.bind(this)}></span>
                    <span className={`arrow fa fa-angle-right right ${rightActive} ${hide}`} onClick={this.next.bind(this)}></span>
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
        Req.getParameter({module_id: module.id}, (newData)=> {
            this.setState({
                parameters: newData,
                module: module
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
            </div>
        );
    }
}

export default Create
