export default {
    path: 'tags',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../views/tags').default)
        }, 'tags')
    }
}