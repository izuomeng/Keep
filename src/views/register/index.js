import React from 'react'
import {authenticate} from '../../store/action/popInfo'
import {connect} from 'react-redux'
import {Container} from '../login'


const mapDispatch = (dispatch) => ({
    handleSubmit(name, pass) {
        dispatch(authenticate('/register', name, pass))
    }
})

const WrapperContainer = connect(null, mapDispatch)(Container)

export default () => (
    <WrapperContainer name="注册" />
)