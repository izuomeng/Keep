import React from 'react'
import {Router, browserHistory} from 'react-router'
import store from '../store'

let hasRedirect = false

const rootRoute = {
    path: '/',
    indexRoute: require('./routes/home').default,
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../App').default)
        }, 'rootRoute')
    },
    childRoutes: [
        require('./routes/reminders').default,
        require('./routes/archive').default,
        require('./routes/tags').default,
        require('./routes/trash').default,
        require('./routes/search').default,
        require('./routes/login').default,
        require('./routes/register').default,
        require('./routes/404').default
    ],
    onEnter(next, replace) {
        const user = store.getState('user')
        if (!user.id && !hasRedirect) {
            hasRedirect = true
            replace({pathname: '/login'})
        }
    }
}

const Routes = () => (
    <Router history={browserHistory} routes={rootRoute} />
)

export default Routes
