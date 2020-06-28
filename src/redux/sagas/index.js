import { fork, take, call, put, delay } from 'redux-saga/effects'
import * as taskTypes from './../../redux/task/taskTypes'
import { getList } from './../../apis/task'
import { STATUS_CODE } from './../../constants'
import { fetchListTaskSuccess, fetchListTaskFailed } from './../../redux/task/taskActions'
import { showLoading, hideLoading } from './../../redux/ui/uiActions'

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
function* watchFetchListTaskAction() {
	while (true) {
		yield take(taskTypes.FETCH_TASK)
		yield put(showLoading())
		const res = yield call(getList)
		const { status, data } = res;
		if (status === STATUS_CODE.SUCCESS) {
			yield put(fetchListTaskSuccess(data))
		} else {
			yield put(fetchListTaskFailed(data))
		}
		yield delay(1000);
		yield put(hideLoading())
	}
}

function* watchCreateTaskAction() {
	console.log('watch create task action')
}

function* rootSaga() {
	yield fork(watchFetchListTaskAction)
	yield fork(watchCreateTaskAction)
}

export default rootSaga