import hooks from './hooks'

export default {
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../views/home').default)
        }, 'home')
    },
    onEnter(next, replace) {
        hooks(next, replace)
    }
}