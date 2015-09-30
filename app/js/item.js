import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

class Item extends React.Component {
    constructor () {
        super()
        this.state = { steps: ['safeSys', 'watcher', 'circuit', 'machinery'] }
    }
    render() {
        if (this.props.items) {
            const items = this.props.items
            return (
                <div className='items form-horizontal'>

                    {this.props.items.map(function (item, i) {
                        let itemDom;
                        if (item.type == "text") {
                            itemDom = (
                                <div className="control-group" key={i}>
                                    <label className="control-label" htmlFor={`inputWarning${i}`}>{item.name}:</label>
                                    <div className="controls">
                                        <input type="text" id={`inputWarning${i}`} />
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
                                            <span key={j}>
                                                <input type="radio" name="optionsRadios" value="option1" />
                                                <a className="btn" type="submit">{value}</a>
                                            </span>
                                        )
                                    })}
                                    </div>
                                </div>
                            )
                        }
                        return itemDom;

                    })}
                </div>
            )
        }
    }
}

export {Item}