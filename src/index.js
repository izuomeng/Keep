import 'react-hot-loader/patch'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import Routes from './router'
import axios from 'axios'

axios.defaults.baseURL = '/api'

ReactDOM.render(
    <AppContainer>
        <Provider store={store}>
            <Routes />
        </Provider>
    </AppContainer>,
    document.getElementById('root')
)
if (module.hot) {
    module.hot.accept('./router', () => {
        const NextRootContainer = require('./router').default
        ReactDOM.render(
            <Provider store={store}>
                <NextRootContainer />
            </Provider>, 
            document.getElementById('root')
        )
    })
}
registerServiceWorker()
