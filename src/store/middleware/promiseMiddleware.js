const isPromise = (obj) => obj && typeof obj.then === 'function'

export default ({dispatch}) => (next) => (action) => {
    const {types, promise, ...rest} = action
    if (!isPromise(promise) || !(types && types.length >= 3)) {
        return next(action)
    }
    const [PENDING, DONE, FAIL, OTHER] = types
    dispatch({
        type: PENDING,
        ...rest
    })
    return action.promise.then((result) => {
        dispatch({
            type: DONE,
            result,
            ...rest
        }, (error) => {
            dispatch({
                type: FAIL
            })
        })
        dispatch({type: OTHER, result})
    })
}