import * as Types from '../actionTypes/user'

export const addUser = (id, name) => ({
    type: Types.ADD_USER,
    id,
    name
})
export const removeUser = () => ({
    type: Types.REMOVE_USER
})