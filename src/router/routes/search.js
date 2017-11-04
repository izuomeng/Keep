import hooks from './hooks'

export default {
    path: 'search',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../views/search').default)
        }, 'search')
    },
    onEnter(next, replace) {
        hooks(next, replace)
    }
}