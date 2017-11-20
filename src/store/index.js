import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import COLOR from '../static/javascript/color'
import TAB from '../static/javascript/tab'
import noteReducer from './reducer/notes'
import userReducer from './reducer/user'
import tabReducer from './reducer/tab'
import sidebarReducer from './reducer/sidebar'
import popInfoReducer from './reducer/popInfo'
import syncProgressReducer from './reducer/syncProgress'
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
    tab: TAB.NOTE,
    sidebar: true,
    popInfo: {
        type: '',
        message: ''
    },
    syncProgress: 'STATIC',
}

const win = window,
    middlewares = [
        addNoteMidleware, 
        promiseMiddleware
    ]

const reducer = combineReducers({
    notes: noteReducer,
    user: userReducer,
    tab: tabReducer,
    sidebar: sidebarReducer,
    popInfo: popInfoReducer,
    syncProgress: syncProgressReducer
})

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    // 注意！！！下面这玩意儿在其他浏览器会报错
    win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
)
export default createStore(
    reducer,
    initState,
    storeEnhancers
)