import { combineReducers } from 'redux'
import todoReducer from '../todos/todosReducer'

const rootReducer = combineReducers({
    todo: todoReducer
})

export default rootReducer