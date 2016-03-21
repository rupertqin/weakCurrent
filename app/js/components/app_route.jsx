import React, { Component, PropTypes } from 'react'
import { Router, Route, Link, IndexRoute, Redirect } from 'react-router'
import { ReduxRouter, routerStateReducer, reduxReactRouter, pushState } from 'redux-router';
import { createHistory, useBasename } from 'history'
import { createStore, compose, combineReducers } from 'redux';
import { Provider, connect } from 'react-redux';

import Req from '../mod/request'
import { Search } from './search.jsx'
import { Login } from './login.jsx'
import Reg from './reg.jsx'
import Solutions from './solutions.jsx'
import { Navbar } from './navbar.jsx'
import SolutionCreate from './solution_create.jsx'
import PaperCreate from './paper_create.jsx'
import Products from './products.jsx'
import { NoMatch } from './404.jsx'


@connect((state) => ({}))
class Wrapper extends React.Component {
    render() {
        return (
            <div className="wrapper">
                <Navbar/>
                <div className="main-content clearfix">
                    {this.props.children && React.cloneElement(this.props.children)}
                </div>
                <div className={`loading ${this.props.route.isLoading ? '' : 'hide'}`}><i className="fa fa-spinner"></i></div>
            </div>  
        )
    }
}

const reducer = combineReducers({
  router: routerStateReducer
});

const store = compose(
  reduxReactRouter({ createHistory })
)(createStore)(reducer);

class AppRoute extends React.Component {
    constructor (props) {
        super(props)
        this.state = {
            isLoading: false
        }
    }
    render() {
        return (
            <Provider store={store}>
                <ReduxRouter>
                    <Route path="/" isLoading={this.props.isLoading} component={Wrapper}>
                        <IndexRoute component={Search} />
                        <Route path="search" component={Search} />
                        <Route path="login" component={Login} />
                        <Route path="reg" component={Reg} />

                        <Route path="solutions" component={Solutions} />
                        <Route path="solution-create/:id" {...this.props} component={SolutionCreate}>
                            <IndexRoute onEnter={function (location, replaceState) {
                                if (!location.params.id) replaceState(null, 'solution-create/0')
                            }} />
                        </Route>
                        <Route path="solution/:id/edit" {...this.props} component={SolutionCreate} />

                        <Route path="products" component={Products} />
                        <Route path="paper-create/:sId-:tId" {...this.props} component={PaperCreate} />
                        <Route path="*" component={NoMatch}/>
                    </Route>
                </ReduxRouter>
            </Provider>
        )
    }
}

export default AppRoute

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


