import 'react-hot-loader/patch'
import { AppContainer } from 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import registerServiceWorker from './registerServiceWorker'
import store from './store'
import {Provider} from 'react-redux'
import Routes from './router'

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
