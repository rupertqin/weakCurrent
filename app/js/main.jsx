import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import configureStore from './store/configureStore'
import App from './containers/app'
import '../scss/common.scss'

const store = configureStore()

console.log(render)

render(
    <Provider store={store}>
        <App />
    </Provider>, 
    document.getElementById('main')
)
