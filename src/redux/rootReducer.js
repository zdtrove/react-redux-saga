import taskReducer from './task/taskReducer'
import uiReducer from './ui/uiReducer'
import { combineReducers } from 'redux'

const rootReducer = combineReducers({
	task: taskReducer,
	ui: uiReducer
})

export default rootReducer