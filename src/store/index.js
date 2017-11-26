import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import COLOR from '../static/javascript/color'
import TAB from '../static/javascript/tab'
import noteReducer from './reducer/notes'
import userReducer from './reducer/user'
import popInfoReducer from './reducer/popInfo'
import appReducer from './reducer/app'
import promiseMiddleware from './middleware/promiseMiddleware'
import addNoteMidleware from './middleware/addNoteMiddleware'

const initState = {
    user: {
        name: ''
    },
    notes: [
        {
            id: 'f4ae8',
            title: {},  //convertToRaw object
            text: {},   //same as title
            lable: '',
            isFixed: false,
            isArchived: false,
            bgColor: COLOR.WHITE,
            reminderInfo: {
                date: new Date(),
                repeat: ''
            },
            deleteTime: new Date(),
            height: 134
        },
    ],
    popInfo: {
        type: '',
        message: ''
    },
    app: {
        tab: TAB.NOTE,
        sidebar: true,
        syncProgress: 'STATIC',
        isWaterFall: true,
    }
}

const middlewares = [
        addNoteMidleware, 
        promiseMiddleware
    ]

const reducer = combineReducers({
    notes: noteReducer,
    user: userReducer,
    popInfo: popInfoReducer,
    app: appReducer
})

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    // 注意！！！下面这玩意儿在其他浏览器会报错
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
export default createStore(
    reducer,
    initState,
    storeEnhancers
)