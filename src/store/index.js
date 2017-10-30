import {createStore, combineReducers, applyMiddleware, compose} from 'redux'
import COLOR from '../static/javascript/color'
import TAB from '../static/javascript/tab'
import noteReducer from './reducer/note'
import tabReducer from './reducer/tab'
const initState = {
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
        }
    ],
    tab: TAB.NOTE
}

const win = window,
    middlewares = []

const reducer = combineReducers({
    notes: noteReducer,
    tab: tabReducer
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