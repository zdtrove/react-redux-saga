import { call, put, delay, takeLatest, takeEvery, select } from 'redux-saga/effects'
import * as taskTypes from './../../redux/task/taskTypes'
import { getList, addTAsk, updateTask, deleteTask } from './../../apis/task'
import { STATUS_CODE, STATUSES } from './../../constants'
import { fetchListTaskSuccess, fetchListTaskFailed, addTaskSuccess, addTaskFailed, fetchListTask, updateTaskSuccess, updateTaskFailed, deleteTaskSuccess, deleteTaskFailed } from './../../redux/task/taskActions'
import { showLoading, hideLoading } from './../../redux/ui/uiActions'
import { hideModal } from '../modal/modalActions'

/**
 * B1: dispatch (thuc thi) action fetch task
 * B2: Goi api
 * B2.1: Hien thi thanh tien trinh (loading)
 * B3: Kiem tra status code
 * Neu thanh cong...
 * Neu that bai...
 * B4: Tat loading
 * B5: Thuc thi cac cong viec tiep theo
 */
function* watchFetchListTaskAction({ payload }) {
	yield put(showLoading())
	const { params } = payload
	const res = yield call(getList, params)
	const { status, data } = res;
	if (status === STATUS_CODE.SUCCESS) {
		yield put(fetchListTaskSuccess(data))
	} else {
		yield put(fetchListTaskFailed(data))
	}
	yield delay(1000);
	yield put(hideLoading())
}

function* filterTaskSaga({ payload }) {
	yield delay(500)
	const { keyword } = payload
	yield put(fetchListTask({
		q: keyword
	}))
}

function* addTaskSaga({ payload }) {
	const { title, description } = payload
	yield put(showLoading())
	const resp = yield call(addTAsk, {
		title,
		description,
		status: STATUSES[0].value
	})
	const { data, status } = resp
	if (status === STATUS_CODE.CREATED) {
		yield put(addTaskSuccess(data))
		yield put(hideModal())
	} else {
		yield put(addTaskFailed(data))
	}
	yield delay(1000)
	yield put(hideLoading())
}

function* updateTaskSaga({ payload }) {
	const { title, description, status } = payload
	const taskEditing = yield select(state => state.task.taskEditing)
	yield put(showLoading())
	const resp = yield call(updateTask, {title, description, status}, taskEditing.id)
	const { data, status: statusCode } = resp
	if (statusCode === STATUS_CODE.SUCCESS) {
		yield put(updateTaskSuccess(data))
		yield put(hideModal())
	} else {
		yield put(updateTaskFailed(data))
	}
	yield delay(1000)
	yield put(hideLoading())
}

function* deleteTaskSaga({ payload }) {
	const { id } = payload
	yield put(showLoading())
	const resp = yield call(deleteTask, id)
	const { data, status: statusCode } = resp
	if (statusCode === STATUS_CODE.SUCCESS) {
		yield put(deleteTaskSuccess(id))
		yield put(hideModal())
	} else {
		yield put(deleteTaskFailed(data))
	}
	yield delay(1000)
	yield put(hideLoading())
}

function* rootSaga() {
	yield takeEvery(taskTypes.FETCH_TASK, watchFetchListTaskAction)
	yield takeLatest(taskTypes.FILTER_TASK, filterTaskSaga)
	yield takeEvery(taskTypes.ADD_TASK, addTaskSaga)
	yield takeLatest(taskTypes.UPDATE_TASK, updateTaskSaga)
	yield takeLatest(taskTypes.DELETE_TASK, deleteTaskSaga)
}

export default rootSaga