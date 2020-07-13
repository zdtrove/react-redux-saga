import * as types from './taskTypes'
import { STATUSES } from './../../constants'

export const fetchListTask = (params = {}) => {
	return {
		type: types.FETCH_TASK,
		payload: {
			params
		}
	}
}

export const fetchListTaskSuccess = data => {
	return {
		type: types.FETCH_TASK_SUCCESS,
		payload: {
			data
		}
	}
}

export const fetchListTaskFailed = error => {
	return {
		type: types.FETCH_TASK_FAILED,
		payload: {
			error
		}
	}
}

export const addTask = (title, description) => {
	return {
		type: types.ADD_TASK,
		payload: {
			title,
			description
		}
	}
}

export const addTaskSuccess = data => {
	return {
		type: types.ADD_TASK_SUCCESS,
		payload: {
			data
		}
	}
}

export const addTaskFailed = error => {
	return {
		type: types.ADD_TASK_FAILED,
		payload: {
			error
		}
	}
}

export const updateTask = (title, description, status = STATUSES[0].value) => {
	return {
		type: types.UPDATE_TASK,
		payload: {
			title,
			description,
			status
		}
	}
}

export const updateTaskSuccess = data => {
	return {
		type: types.UPDATE_TASK_SUCCESS,
		payload: {
			data
		}
	}
}

export const updateTaskFailed = error => {
	return {
		type: types.UPDATE_TASK_FAILED,
		payload: {
			error
		}
	}
}

export const deleteTask = id => {
	return {
		type: types.DELETE_TASK,
		payload: {
			id
		}
	}
}

export const deleteTaskSuccess = id => {
	return {
		type: types.DELETE_TASK_SUCCESS,
		payload: {
			id
		}
	}
}

export const deleteTaskFailed = error => {
	return {
		type: types.DELETE_TASK_FAILED,
		payload: {
			error
		}
	}
}

export const filterTask = keyword => ({
	type: types.FILTER_TASK,
	payload: {
		keyword
	}
})

export const filterTaskSuccess = data => ({
	type: types.FILTER_TASK_SUCCESS,
	payload: {
		data
	}
})

export const setTaskEditing = task => ({
	type: types.SET_TASK_EDITING,
	payload: {
		task
	}
})