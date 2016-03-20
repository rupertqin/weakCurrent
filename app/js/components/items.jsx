import React from 'react'
import { Router, Route, Link, Redirect } from 'react-router'
import linkState from 'react-link-state'

class Item extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            answer: ''
        }
    }

    render() {
        let itemDom;
        if (this.props.data.type == "text") {
            itemDom = (
                <div className="control-group">
                    <label className="control-label" htmlFor={`inputWarning`}>{this.props.data.name}:</label>
                    <div className="controls">
                        <input type="text" valueLink={linkState(this, 'answer')} />
                    </div>
                </div>
            )
        } else {
            itemDom = (
                <div className="control-group">
                    <label className="control-label ellipsis">{this.props.data.name}:</label>
                    <div className="controls">
                        <select valueLink={linkState(this, 'answer')}>
                            {this.props.data.options.map(function (value, j) {
                                return (
                                    <option name={`optionsRadios`} value={j} key={j}>
                                        {value}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                </div>
            )
        }
        return itemDom;

    }
}
class Items extends React.Component {
    constructor () {
        super()
    }

    replaceWithInput (context, i) {
        var html = context.replace('<>', '<input type="text" value="" id="inputWarning' + i + '" />')
        return {__html: html}
    }

    render() {
        return (
            <div>
                {this.props.items.map(function (item, i) {
                    console.log(item);
                    return <Item data={item} key={i} />
                }.bind(this))}
            </div>
        )
    }
}

export {Items}
