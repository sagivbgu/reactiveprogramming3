import {UserSearchActionsConstants} from './constants'
import {call, put, takeLatest, all} from 'redux-saga/effects'
import Actions from './actions'

const SEARCH_USER_URL = '/api/user/search';

function* searchUser(action) {
    console.log('inside searchUser saga. Action=', action);
    try {
        let searchQuery = action.payload;
        const param = '?query=' + encodeURIComponent(searchQuery);
        const res = yield call(fetch, SEARCH_USER_URL + param);
        const json = yield call([res, 'json']);

        if (json.error) {
            yield put(Actions.searchUserFailureAction(json.error));
        } else {
            yield put(Actions.searchUserSuccessAction(json));
        }
    } catch (e) {
        yield put(Actions.searchUserFailureAction(e.message));
    }
}

function* searchSaga() {
    console.log('inside search (user) saga');
    yield takeLatest(UserSearchActionsConstants.SEARCH_USER, searchUser);
}

function* UserSearchSaga() {
    console.log('inside UserSearchSaga');
    yield all([
        searchSaga()
    ]);
}

export default UserSearchSaga;
