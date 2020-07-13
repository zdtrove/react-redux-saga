import taskReducer from './task/taskReducer'
import uiReducer from './ui/uiReducer'
import modalReducer from './modal/modalReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	task: taskReducer,
	ui: uiReducer,
	modal: modalReducer
})

export default rootReducer