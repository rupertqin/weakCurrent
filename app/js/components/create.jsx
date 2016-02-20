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
            currId: this.props.ids[0],
            ids: this.props.ids.slice(1),
            startIdx: 0
        }
    }

    componentDidMount () {

        // if r, root module
        let parent_id = this.state.currId
        if (this.state.currId == 'r') parent_id = ''
        Req.getModule({parent_id: parent_id}, function(data){
            console.log(data)
            this.setState({
                boxes: data,
                shownBoxes: data.slice(0,4)
            })
        }.bind(this))
    }

    next () {
        const len = this.state.boxes.length
        let sIdx = this.state.startIdx
        if (sIdx + 4 <= len -1) {
            let newSIdx = ++this.state.startIdx
            this.setState({shownBoxes: this.props.boxes.slice(newSIdx, newSIdx + 4)})
        }
    }

    prev () {
        const len = this.state.boxes.length
        let sIdx = this.state.startIdx
        if (sIdx > 0) {
            let newSIdx = --this.state.startIdx
            this.setState({shownBoxes: this.props.boxes.slice(newSIdx, newSIdx + 4)})
        }
    }

    render () {
        if (!this.state.shownBoxes) return null
        let leftActive = ''
        let rightActive = ''
        let hide = ''


        if (this.state.boxes.length <= 4) {
            hide = " hidden "
            hide = " hidden "
        } else {
            if (this.state.startIdx > 0) {
                leftActive = " active "
            } 
            if (this.state.startIdx + 4 < this.state.boxes.length ) {
                rightActive = " active "
            }
        }
        let _StepRow = null
        if (this.state.ids.length) {
            _StepRow = <StepRow ids={this.state.ids} />
        }
        return (
            <div>
                <div className={`row-fluid row-step`}>
                    {this.state.shownBoxes.map(function (node, i) {
                        return (
                            <div className="span3" key={i}>
                                <Link to={`/create/step`} activeClassName="active">
                                    <img src={node.cover} className="cover" />
                                    <button className="btn" activeClassName="btn-success">{node.name}</button>
                                </Link>
                            </div>
                        )
                    }.bind(this))}
                    <span className={`arrow fa fa-angle-left left ${leftActive} ${hide}`} onClick={this.prev.bind(this)}></span>
                    <span className={`arrow fa fa-angle-right right ${rightActive} ${hide}`} onClick={this.next.bind(this)}></span>
                    <span className={`arrow fa fa-angle-down`}></span>
                </div>
                {_StepRow}
            </div>
        )
    }
}


class Create extends React.Component {
    constructor (props) {
        super(props)
        this.state = {}
    }

    render() {

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
                    <StepRow ids={['r']} />
                    <StepRow ids={ids} />
                </div>
                {this.props.children && React.cloneElement(this.props.children, {data: this.state.data })}
            </div>
        );
    }
}

export {Create}
