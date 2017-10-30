export default {
    path: 'home',
    getComponent(nextState, cb) {
        require.ensure([], (require) => {
            cb(null, require('../../views/home').default)
        }, 'home')
    }
}