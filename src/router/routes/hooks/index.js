import store from '@/store'

export default (next, replace) => {
    const user = store.getState()['user']
    if (!user.name) {
        replace({
            pathname: '/loading',
            query: {
                go: next.location.pathname.slice(1)
            }
        })
    }
}