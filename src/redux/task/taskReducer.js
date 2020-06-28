import * as taskTypes from './taskTypes'
import { toastError } from './../../helpers/toastHelper'

const initialState = {
	listTask: []
}

const taskReducer = (state = initialState, action) => {
	switch (action.type) {
		case taskTypes.FETCH_TASK:
			return {
				...state,
				listTask: []
			}
		case taskTypes.FETCH_TASK_SUCCESS:
			return {
				...state,
				listTask: action.payload.data
			}
		case taskTypes.FETCH_TASK_FAILED:
			const { error } = action.payload
			toastError(error)
			return {
				...state,
				listTask: []
			}
		default:
			return state
	}
}

export default taskReducer