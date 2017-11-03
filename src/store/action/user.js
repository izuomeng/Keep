import * as Types from '../actionTypes/user'

export const addUser = (name) => ({
    type: Types.ADD_USER,
    name
})
export const removeUser = () => ({
    type: Types.REMOVE_USER
})