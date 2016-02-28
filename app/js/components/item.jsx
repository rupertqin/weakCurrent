import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

class Item extends React.Component {
    constructor () {
        super()
    }
    replaceWithInput (context, i) {
        var html = context.replace('<>', '<input type="text" value="" id="inputWarning' + i + '" />')
        return {__html: html}
    }
    render() {
        const items = this.props.items
        return (
            <form className='items form-horizontal'>

                {this.props.items.map(function (item, i) {
                    let itemDom;
                    if (item.type == "text") {
                        itemDom = (
                            <div className="control-group" key={i}>
                                <label className="control-label" htmlFor={`inputWarning${i}`}>{item.name}:</label>
                                <div className="controls" dangerouslySetInnerHTML={this.replaceWithInput(item.context, i)}>
                                </div>
                            </div>
                        )
                    } else {
                        itemDom = (
                            <div className="control-group" key={i}>
                                <label className="control-label ellipsis">{item.name}:</label>
                                <div className="controls">
                                    <select>
                                        {item.options[0].split('，').map(function (value, j) {
                                            return (
                                                <option name={`optionsRadios${i}`} key={j}>
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

                }.bind(this))}
            </form>
        )
    }
}

export {Item}
