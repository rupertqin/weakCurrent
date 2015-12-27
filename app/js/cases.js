import React from 'react';
import { Router, Route, Link, Redirect } from 'react-router';

class Cases extends React.Component {
    constructor () {
        super()
    }
    render() {
        const items = this.props.items
        return (
            <div> 
                <header className="row-fluid">
                    <div className="span3"><h1>方案列表</h1></div>
                </header>
                <form>
                    <div className="input-append">
                        <input className="span4" id="" type="text"/>
                        <button className="btn btn-success" type="button">
                            <i className="icon-search icon-white"></i> 搜索
                        </button>
                    </div>
                </form> 
            </div> 
        )
    }
}

export default Cases

