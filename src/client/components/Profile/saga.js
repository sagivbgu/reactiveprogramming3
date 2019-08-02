import {call, put, takeLatest, all} from 'redux-saga/effects'
import Actions from './actions'
import {ProfileActionsConstants} from "./constants";
import {getBase64} from "../../utils";
import AppActions from "../App/actions";

const FETCH_PROFILE_URL = '/api/user/profile';
const UPDATE_PROFILE_URL = '/api/user/profile/update';
const DELETE_REVIEW_URL = '/api/restaurant/deletereview';

function* fetchProfile(action) {
    console.log('inside fetchProfile Saga. Action=', action);

    try {
        let username = action.payload;
        const param = '?username=' + encodeURIComponent(username);

        const res = yield call(fetch, FETCH_PROFILE_URL + param);
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

function* updateProfile(action) {
    console.log('inside updateProfile Saga. Action=', action);

    try {
        const photoContentType = action.payload.photo.type;
        let photoBase64 = yield call(getBase64, action.payload.photo);
        let photo = {
            contentType: photoContentType,
            photo: photoBase64
        };

        const res = yield call(fetch, UPDATE_PROFILE_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: action.username,
                    profile: {
                        username: action.payload.username,
                        location: action.payload.location,
                        photo: photo
                    }
                })
            });

        const json = yield call([res, 'json']); //retrieve body of response

        if (json.error) {
            yield put(Actions.updateProfileFailureAction(json.error));
        } else {
            yield put(Actions.updateProfileSuccessAction(json));
            yield put(AppActions.loginAction(json.username));
        }
    } catch (e) {
        yield put(Actions.updateProfileFailureAction(e.message));
    }
}

function* deleteReview(action) {
    console.log('inside deleteReview Saga. Action=', action);

    try {
        const reviewId = action.payload.reviewId;

        const res = yield call(fetch, DELETE_REVIEW_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({reviewId: reviewId})
            });

        const json = yield call([res, 'json']); //retrieve body of response

        if (json.error) {
            yield put(Actions.updateProfileFailureAction(json.error));
        } else {
            yield put(Actions.deleteReviewSuccessAction(action.payload.reviewIndex));
        }
    } catch (e) {
        yield put(Actions.updateProfileFailureAction(e.message));
    }
}

function* fetchProfileSaga() {
    console.log('inside fetch profile saga');
    yield takeLatest(ProfileActionsConstants.FETCH_PROFILE_REQUEST, fetchProfile);
}

function* updateProfileSaga() {
    console.log('inside update profile saga');
    yield takeLatest(ProfileActionsConstants.UPDATE_PROFILE_REQUEST, updateProfile);
}

function* deleteReviewSaga() {
    console.log('inside delete review saga');
    yield takeLatest(ProfileActionsConstants.DELETE_REVIEW, deleteReview);
}

function* ProfileSaga() {
    console.log('inside ProfileSaga');
    yield all([
        fetchProfileSaga(),
        updateProfileSaga(),
        deleteReviewSaga()
    ]);
}

export default ProfileSaga;
