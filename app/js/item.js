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
                                <div className="control-group">
                                    <label className="control-label" for="inputWarning">{item.name}:</label>
                                    <div className="controls">
                                        {item.name}
                                        <input type="text" id="inputWarning" />
                                    </div>
                                </div>
                            )
                        } else {
                            itemDom = (
                                <div className="control-group">
                                    <label className="control-label" for="inputWarning">{item.name}:</label>
                                    {item.values.map(function (value, i) {
                                        return (
                                            <div className="controls">
                                                <label className="radio">
                                                  <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" />
                                                  <a className="btn" type="submit">{value}</a>
                                                </label>
                                            </div>
                                        )
                                    })}
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