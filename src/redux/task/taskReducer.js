import * as types from './taskTypes'
import { toastError, toastSuccess } from './../../helpers/toastHelper'

const initialState = {
	listTask: [],
	taskEditing: null
}

const taskReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case types.FETCH_TASK:
			return {
				...state,
				listTask: []
			}
		case types.FETCH_TASK_SUCCESS:
			return {
				...state,
				listTask: payload.data
			}
		case types.FETCH_TASK_FAILED:
			toastError(payload.error)
			return {
				...state,
				listTask: []
			}
		case types.FILTER_TASK_SUCCESS:
			return {
				...state,
				listTask: payload.data
			}
		case types.ADD_TASK:
			return {
				...state
			}
		case types.ADD_TASK_SUCCESS:
			toastSuccess('Add task success')
			return {
				...state,
				listTask: [payload.data, ...state.listTask]
			}
		case types.ADD_TASK_FAILED:
			toastError(payload.error)
			return {
				...state
			}
		case types.SET_TASK_EDITING:
			return {
				...state,
				taskEditing: payload.task
			}
		case types.UPDATE_TASK:
			return {
				...state
			}
		case types.UPDATE_TASK_SUCCESS:
			const index = state.listTask.findIndex(item => item.id === payload.data.id)
			if (index !== -1) {
				const newList = [
					...state.listTask.slice(0, index),
					payload.data,
					...state.listTask.slice(index + 1)
				]
				toastSuccess('Update task success')
				return {
					...state,
					listTask: newList
				}
			}
			return {
				...state
			}
		case types.UPDATE_TASK_FAILED:
			toastError(payload.error)
			return {
				...state
			}
		case types.DELETE_TASK:
			return {
				...state
			}
		case types.DELETE_TASK_SUCCESS:
			toastSuccess('Delete task success')
			return {
				...state,
				listTask: state.listTask.filter(item => item.id !== payload.id)
			}
		case types.DELETE_TASK_FAILED:
			toastError(payload.error)
			return {
				...state
			}

		default:
			return state
	}
}

export default taskReducer