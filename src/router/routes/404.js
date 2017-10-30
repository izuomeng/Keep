export default {
    path: '*',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../views/404').default)
        }, '404')
    }
}