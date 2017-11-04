export default {
    path: 'loading',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../views/loading').default)
        }, 'loading')
    }
}