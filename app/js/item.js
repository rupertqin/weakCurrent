import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

class Item extends React.Component {
    constructor () {
        super()
    }
    replaceWithInput (context, i) {
        console.log(context)
        var html = context.replace('<>', '<input type="text" id="inputWarning' + i + '" />')
        return {__html: html}
    }
    render() {
        if (this.props.items) {
            const items = this.props.items
            var myInput = '<input type="text" />'
            return (
                <div className='items form-horizontal'>

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
                                    <label className="control-label">{item.name}:</label>
                                    <div className="controls">
                                    {item.values.map(function (value, j) {
                                        return (
                                            <label key={j}>
                                                <input type="radio" name="optionsRadios" value="option1" />
                                                <a className="btn" type="submit">{value}</a>
                                            </label>
                                        )
                                    })}
                                    </div>
                                </div>
                            )
                        }
                        return itemDom;

                    }.bind(this))}
                </div>
            )
        }
    }
}

export {Item}