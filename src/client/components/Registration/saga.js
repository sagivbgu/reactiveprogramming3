import {RegistrationActionsConstants} from './constants'
import {call, put, takeLatest, all} from 'redux-saga/effects'
import Actions from './actions'
import {getBase64} from '../../utils'

const VALIDATE_USERNAME_UNIQUE_URL = 'api/user/exists';
const REGISTER_USER_URL = '/api/user/registration';

function* validateUsernameUnique(action) {
    console.log('inside validateUsernameUnique Saga. Action=', action);
    try {
        const param = '?username=' + encodeURIComponent(action.payload.username);
        const res = yield call(fetch, VALIDATE_USERNAME_UNIQUE_URL + param);
        const json = yield call([res, 'json']); //retrieve body of response
        console.log('validateUsernameUnique json = ' + JSON.stringify(json));
        yield put(Actions.validateUsernameUniqueSuccessAction(json.username, json.isUnique));
    } catch (e) {
        yield put(Actions.validateUsernameUniqueFailureAction(e.message));
    }
}

function* registerUser(action) {
    console.log('inside registerUser Saga. Action=', action);

    try {
        let {username, location} = action.payload;
        const photoContentType = action.payload.photo.type;
        let photoBase64 = yield call(getBase64, action.payload.photo);
        let photo = {
            contentType: photoContentType,
            photo: photoBase64
        };

        const res = yield call(fetch, REGISTER_USER_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, location, photo})
            });

        const json = yield call([res, 'json']); //retrieve body of response

        yield put(Actions.registerUserSuccessAction(json)); // TODO, and on failure create FailureAction
    } catch (e) {
        yield put(Actions.registerUserFailureAction(e.message));
    }
}

function* validateUsernameUniqueSaga() {
    yield takeLatest(RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE, validateUsernameUnique);
}

function* registerUserSaga() {
    console.log('inside register user saga');
    yield takeLatest(RegistrationActionsConstants.REGISTER_USER, registerUser);
}

function* RegistrationSaga() {
    console.log('inside RegistrationSaga');
    yield all([
        validateUsernameUniqueSaga(),
        registerUserSaga()
    ]);
}

export default RegistrationSaga;
