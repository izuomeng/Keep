import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import COLOR from '../static/javascript/color'
import TAB from '../static/javascript/tab'
import noteReducer from './reducer/notes'
import userReducer from './reducer/user'
import tabReducer from './reducer/tab'
import sidebarReducer from './reducer/sidebar'
import popInfoReducer from './reducer/popInfo'
import promiseMiddleware from './middleware/promiseMiddleware'

const initState = {
    user: {
        name: ''
    },
    notes: [
        {
            id: '0',
            text: 'test0',
            lable: '',
            isReminder: false,
            isFixed: false,
            bgColor: COLOR.WHITE,
            reminderInfo: {
                date: new Date(),
                repeat: ''
            },
            isDeleted: false,
            deleteTime: new Date()
        },
        {
            id: '1',
            text: 'test1',
            lable: '',
            isReminder: false,
            isFixed: false,
            bgColor: COLOR.WHITE,
            reminderInfo: {
                date: new Date(),
                repeat: ''
            },
            isDeleted: false,
            deleteTime: new Date()
        }
    ],
    tab: TAB.NOTE,
    sidebar: true,
    popInfo: {
        type: '',
        message: ''
    }
}

const win = window,
    middlewares = []

middlewares.push(promiseMiddleware)

const reducer = combineReducers({
    notes: noteReducer,
    user: userReducer,
    tab: tabReducer,
    sidebar: sidebarReducer,
    popInfo: popInfoReducer
})

const storeEnhancers = compose(
    applyMiddleware(...middlewares),
    win.__REDUX_DEVTOOLS_EXTENSION__ && win.__REDUX_DEVTOOLS_EXTENSION__()
)
export default createStore(
    reducer,
    initState,
    storeEnhancers
)