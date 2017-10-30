import React from 'react'
import ReactDOM from 'react-dom'
import './static/css/index.css'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import {Provider} from 'react-redux'
import Routes from './router'

ReactDOM.render(
    <Provider store={store}>
        <Routes />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()
