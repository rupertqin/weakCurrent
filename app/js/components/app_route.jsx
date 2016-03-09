import React, { Component, PropTypes } from 'react'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'
import { createHistory, useBasename } from 'history'
import { createStore } from 'redux'
import Req from '../mod/request'
import { Search } from './search.jsx'
import { Login } from './login.jsx'
import Reg from './reg.jsx'
import Solutions from './solutions.jsx'
import { Navbar } from './navbar.jsx'
import Create from './create.jsx'
import DocGeneration from './doc_generation.jsx'
import Products from './products.jsx'
import { NoMatch } from './404.jsx'

// Global communicate subscript/dispac
window.Commu = {
    price: 0,
    el: document.createElement('div'),
    event: new Event('compuPrice')
}

class Wrapper extends React.Component {
    constructor (props) {
        super(props)
    }
    render() {
        return (
            <div className="wrapper">
                <Navbar/>
                <div className="main-content clearfix">
                    {this.props.children && React.cloneElement(this.props.children)}
                </div>
            </div>  
        )
    }
}

export default class appRoute extends React.Component {
    render() {
        return (
            <Router>
                <Route path="/" component={Wrapper}>
                    <IndexRoute component={Search} />
                    <Route path="search" component={Search} />
                    <Route path="login" component={Login} />
                    <Route path="reg" component={Reg} />
                    <Route path="solutions" component={Solutions} />
                    <Route path="create/:id" component={Create}>
                        <IndexRoute onEnter={function (location, replaceState) {
                            if (!location.params.id) replaceState(null, '/create/0')
                        }} />
                    </Route>
                    <Route path="products" component={Products} />
                    <Route path="doc-generation/:docId" {...this.props} component={DocGeneration} />
                    <Route path="*" component={NoMatch}/>
                </Route>
            </Router>
        )
    }
}


// do not use history in IE
// const u = navigator.userAgent
// if (false && u.indexOf('Trident') > -1) {
//     React.render((
//         <Router>
//             <MyRouters/>
//         </Router>
//     ), document.getElementById('main'))
// } else {
    
// }


