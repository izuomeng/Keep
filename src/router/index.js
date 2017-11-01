import React from 'react'
import {Router, browserHistory} from 'react-router'
const rootRoute = {
    path: '/',
    indexRoute: require('./routes/home').default,
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../App').default)
        }, 'rootRoute')
    },
    childRoutes: [
        require('./routes/home').default,
        require('./routes/reminders').default,
        require('./routes/archive').default,
        require('./routes/tags').default,
        require('./routes/trash').default,
        require('./routes/search').default,
        require('./routes/404').default
    ]
}

const Routes = () => (
    <Router history={browserHistory} routes={rootRoute} />
)

export default Routes
