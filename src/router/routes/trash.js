import hooks from './hooks'

export default {
    path: 'trash',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../views/trash').default)
        }, 'trash')
    },
    onEnter(next, replace) {
        hooks(next, replace)
    }
}