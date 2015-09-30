import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';




class StepRow extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            shownBoxes: props.boxes.slice(0,4),
            startIdx: 0
        }
    }

    next () {
        const len = this.props.boxes.length
        var sIdx = this.state.startIdx
        if (sIdx + 4 <= len -1) {
            let newSIdx = ++this.state.startIdx
            this.setState({shownBoxes: this.props.boxes.slice(newSIdx, newSIdx + 4)})
        }

    }

    prev () {
        const len = this.props.boxes.length
        var sIdx = this.state.startIdx
        if (sIdx > 0) {
            let newSIdx = --this.state.startIdx
            this.setState({shownBoxes: this.props.boxes.slice(newSIdx, newSIdx + 4)})
        }

    }

    render () {
        const stepName = this.props["step-name"]
        var rowClaName = "row-fluid row-step row-" + stepName
        var leftClaName = "arraw icon-chevron-left"
        var rightClaName = "arraw icon-chevron-right"

        
        if (this.props.boxes.length <= 4) {
            leftClaName += " hidden"
            rightClaName += " hidden"
        } else {
            if (this.state.startIdx == 0) {
                leftClaName += " hidden"
            } 
            if (this.state.startIdx + 4 == this.props.boxes.length) {
                rightClaName += " hidden"
            }
        }
        return (
            <div className={rowClaName}>
                {this.state.shownBoxes.map(function (node, i) {
                    return (
                        <div className="span3" key={i}>
                            <Link to={`/create/step/${stepName}/node/${i+1+this.state.startIdx}`} activeClassName="active">
                                <img src={node.cover} className="cover" />
                                <button className="btn" activeClassName="btn-success">{node.name}</button>
                            </Link>
                        </div>
                    )
                }.bind(this))}
                <span className={leftClaName} onClick={this.prev.bind(this)}></span>
                <span className={rightClaName} onClick={this.next.bind(this)}></span>
            </div>
        )
    }
}


class Create extends React.Component {



    render() {
        const { safeSys, watcher, circuit, machinery } = this.props.data
        const { stepID, nodeID } = this.props.params
        const  mainClassName= "row-fluid show-grid page-create step-" + stepID

        return (
            <div className={mainClassName}>
                <div className="span9">
                    <div className="page-header">
                        <h1>xxx 方案</h1>
                    </div>
                    <StepRow boxes={safeSys} step-name="safeSys"/>
                    <StepRow boxes={watcher} step-name="watcher"/>
                    <StepRow boxes={circuit} step-name="circuit"/>
                    <StepRow boxes={machinery} step-name="machinery"/>
                </div>
                {this.props.children && React.cloneElement(this.props.children, {data: this.props.data })}
            </div>
        );
    }
}

export {Create}