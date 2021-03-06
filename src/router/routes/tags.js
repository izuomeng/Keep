import hooks from './hooks'

export default {
    path: 'tags/:name',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../views/tags').default)
        }, 'tags')
    },
    onEnter(next, replace) {
        hooks(next, replace)
    }
}