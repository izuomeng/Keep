import hooks from './hooks'

export default {
    path: 'reminders',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../views/reminders').default)
        }, 'reminders')
    },
    onEnter(next, replace) {
        hooks(next, replace)
    }
}