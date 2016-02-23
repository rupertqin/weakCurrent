import React from 'react'
import { Router, Route, Link, Redirect } from 'react-router'
import _ from 'lodash'

import Req from '../mod/request'
import { Item } from './item.jsx';

class Sidebar extends React.Component {
    constructor () {
        super()
        this.state = { 
            sumup: Commu.price
        }
    }
    componentDidMount () {
        Commu.el.addEventListener('compuPrice', function (e) {
            this.setState({sumup: Commu.price})
        }.bind(this), false)
    }
    componentWillUnmount () {
        Commu.el.removeEventListener('compuPrice', function () {
        }, false)
    }

    render() {
        const { pathname } = this.props.location
        const { stepID, nodeID } = this.props.params
        const idx = this.state.stepNames.indexOf(stepID)
        const nextIdx = idx == this.state.stepNames.length-1 ? idx : idx+1
        const nextPath = `/create/step/${this.state.stepNames[nextIdx]}`
        const data = this.props.data[nodeID-1]
        return (
            <div className='navbar-inner' key={[stepID,nodeID]}>
                <h3>{data.name}</h3>
                <Item items={data.sidebar} />
                <div className='bottom'>
                    <Link className='btn btn-success next' to={nextPath}>选择子模块</Link>
                    <div className='last-step'>
                        <div className='price'>
                            <p>预估价格</p>
                            <h4>{this.state.sumup}</h4>
                        </div>
                        <Link className='btn btn-success' to={nextPath}>保存方案</Link>
                        <Link className='btn btn-success' query={{showProduct: true}} to={pathname}>选择产品</Link>
                    </div>
                </div>
            </div>
        )
    }
}

class StepRow extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            startIdx: 0
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

    componentDidMount () {
        this.syncProps() 
    }
    componentWillReceiveProps () {
        if (this.props.step >= this.props.ids.length)
            this.syncProps() 
    }

    shouldComponentUpdate (nextProps, nextState) {
        return !_.isEqual(nextProps.ids, this.props.ids) && this.props.step > this.props.ids.length
    }

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
        if (!this.state.boxes || this.state.boxes.length == 0) return null
        let leftActive = ''
        let rightActive = ''
        let hide = ''

        if (this.state.boxes.length <= 4) {
            hide = " hidden "
        } else {
            if (this.state.startIdx > 0) {
                leftActive = " active "
            } 
            if (this.state.startIdx + 4 < this.state.boxes.length ) {
                rightActive = " active "
            }
        }
        
        return (
            <div>
                <div className={`row-fluid row-step`}>
                    {this.state.shownBoxes.map(function (node, i) {
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
                { this.props.step != 0 && this.props.step < this.props.ids.length && <StepRow ids={this.props.ids} 
                    step={this.props.step + 1}
                    parentBoxes={this.state.boxes} 
                    /> 
                }
                {this.props.children}
            </div>
        )
    }
}

class Create extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            boxes: []    
        }
    }

    componentDidMount () {
        Req.getModule({parent_id: ''}, function(data){
            console.log(data)
            this.setState({
                boxes: data
            })
        }.bind(this))
    }

    render() {
        if (this.state.boxes.length == 0) return null
        let { id } = this.props.params
        const ids = id.split('-')
        const mainClassName= "row-fluid show-grid page-create step-" + ids[0] 
        let { location } = this.props
        return (
            <div className={mainClassName}>
                <div className="span9">
                    <div className="page-header">
                        <h1>xxx 方案</h1>
                    </div>
                    <StepRow ids={ids} boxes={this.state.boxes} step={0} />
                    <StepRow ids={ids} parentBoxes={this.state.boxes} step={1} />
                </div>
            </div>
        );
    }
}

export default Create
