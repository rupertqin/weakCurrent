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
        let sIdx = this.state.startIdx
        if (sIdx + 4 <= len -1) {
            let newSIdx = ++this.state.startIdx
            this.setState({shownBoxes: this.props.boxes.slice(newSIdx, newSIdx + 4)})
        }
    }
    prev () {
        const len = this.props.boxes.length
        let sIdx = this.state.startIdx
        if (sIdx > 0) {
            let newSIdx = --this.state.startIdx
            this.setState({shownBoxes: this.props.boxes.slice(newSIdx, newSIdx + 4)})
        }
    }
    render () {
        const stepName = this.props["step-name"]
        let leftActive = ''
        let rightActive = ''
        let hide = ''


        if (this.props.boxes.length <= 4) {
            hide = " hidden "
            hide = " hidden "
        } else {
            if (this.state.startIdx > 0) {
                leftActive = " active "
            } 
            if (this.state.startIdx + 4 < this.props.boxes.length ) {
                rightActive = " active "
            }
        }
        return (
            <div className={`row-fluid row-step row-${stepName}`}>
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
                <span className={`arrow left ${leftActive} ${hide}`} onClick={this.prev.bind(this)}>&lt;</span>
                <span className={`arrow right ${rightActive} ${hide}`} onClick={this.next.bind(this)}>&gt;</span>
            </div>
        )
    }
}


class AmountWidget extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            num: props.num
        }
    }
    add () {
        this.setState({num: ++this.state.num})
    }
    reduce () {
        let num = --this.state.num <= 0 ? 0 : this.state.num
        this.setState({num: num})
    }
    render () {
        return (
            <form>
                <div className="input-prepend">
                    <a className="btn btn-success" onClick={this.reduce.bind(this)}><i className="icon-minus icon-white"></i></a>
                    <input type="text" value={this.state.num} readOnly={true}/>
                    <a className="btn btn-success" onClick={this.add.bind(this)}><i className="icon-plus icon-white"></i></a>
                </div>
            </form>
        )
    }
}

class Product extends React.Component {
    render() {
        let hideClaN = this.props.show ? '' : 'hide'
        return (
            <div className={`product ${hideClaN}`}>
                {this.props.machinery.map(function (onemach, j) {
                    return (
                        <div className={`row-fluid show-grid product-list ${this.props.showWhich != j ? "hide" : ""}`} key={j}>
                            {onemach.products.map(function (product, i) {
                                return (
                                    <div className="span3" key={i}>
                                        <img src={product.cover} className="cover" />
                                        <h4>{product.name}</h4>
                                        <h4>{product.price}元</h4>
                                        <p>{product.description}</p>
                                        <AmountWidget num={1}/>
                                    </div>
                                )
                            })}
                        </div>
                    )
                }.bind(this))}
            </div>
        )
    }
}

class Create extends React.Component {
    render() {
        const { safeSys, watcher, circuit, machinery } = this.props.data
        const { stepID, nodeID } = this.props.params
        const mainClassName= "row-fluid show-grid page-create step-" + stepID
        let { location } = this.props
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
                    <Product machinery={machinery} show={location.query && location.query.showProduct} showWhich={+nodeID-1}/>
                </div>
                {this.props.children && React.cloneElement(this.props.children, {data: this.props.data })}
            </div>
        );
    }
}

export {Create}