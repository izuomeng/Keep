import hooks from './hooks'

export default {
    path: 'archive',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../views/archive').default)
        }, 'archive')
    },
    onEnter(next, replace) {
        hooks(next, replace)
    }
}