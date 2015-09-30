import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';
import { Item } from './item';

class Sidebar extends React.Component {
    constructor () {
        super()
        this.state = { stepNames: ['safeSys', 'watcher', 'circuit', 'machinery'] }
    }
    render() {
        const { pathname } = this.props.location
        const { stepID, nodeID } = this.props.params
        const idx = this.state.stepNames.indexOf(stepID)
        const nextIdx = idx == this.state.stepNames.length-1 ? idx : idx+1
        const nextPath = `/create/step/${this.state.stepNames[nextIdx]}`
        const data = this.props.data[nodeID-1]
        return (
            <div className='navbar-inner'>
                <h3>{data.name}</h3>
                <Item items={data.sidebar} />
                <div className='bottom'>
                    <Link className='btn btn-success next' to={nextPath}>选择子模块</Link>
                </div>
            </div>
        )
    }
}

export {Sidebar}