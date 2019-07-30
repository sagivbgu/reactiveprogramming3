import {call, put, takeLatest, all} from 'redux-saga/effects'
import Actions from './actions'
import {ProfileActionsConstants} from "./constants";

const FETCH_PROFILE_URL = '/api/user/profile';

function* fetchProfile(action) {
    console.log('inside fetchProfile Saga. Action=', action);

    try {
        let username = action.payload;
        const param = '?username=' + encodeURIComponent(username);

        const res = yield call(fetch,FETCH_PROFILE_URL + param);
        const json = yield call([res, 'json']); //retrieve body of response

        if (json.error) {
            yield put(Actions.fetchProfileFailureAction(json.error));
        } else {
            yield put(Actions.fetchProfileSuccessAction(json));
        }
    } catch (e) {
        yield put(Actions.fetchProfileFailureAction(e.message));
    }
}

function* fetchProfileSaga() {
    console.log('inside fetch profile saga');
    yield takeLatest(ProfileActionsConstants.FETCH_PROFILE_REQUEST, fetchProfile);
}

function* ProfileSaga() {
    console.log('inside ProfileSaga');
    yield all([
        fetchProfileSaga()
    ]);
}

export default ProfileSaga;
