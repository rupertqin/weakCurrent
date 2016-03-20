import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import config from './config.js'
import util from './mod/util'

import configureStore from './store/configureStore'
import App from './containers/app'
import '../scss/common.scss'

window.util = util

const store = configureStore()
window.config = config

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('main')
)
