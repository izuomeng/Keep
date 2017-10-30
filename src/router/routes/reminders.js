export default {
    path: 'reminders',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../views/reminders').default)
        }, 'reminders')
    }
}