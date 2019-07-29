import {RegistrationActionsConstants} from './constants'
import {call, put, takeLatest, all} from 'redux-saga/effects'
import Actions from './actions'
import AppActions from '../App/actions'
import {getBase64} from '../../utils'

const VALIDATE_USERNAME_UNIQUE_URL = '/api/user/exists';
const REGISTER_USER_URL = '/api/user/registration';

async function doesUserExist(username) {
    const param = '?username=' + encodeURIComponent(username);
    const res = await fetch(VALIDATE_USERNAME_UNIQUE_URL + param);
    const json = await res.json();
    return json.exists
}

function* validateUsernameUnique(action) {
    try {
        const userExists = yield call(doesUserExist, action.payload);
        yield put(Actions.validateUsernameUniqueSuccessAction(!userExists));
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

        if (json.success) {
            yield put(AppActions.loginAction(username));
        } else {
            yield put(Actions.registerUserFailureAction(json.error));
        }
    } catch (e) {
        yield put(Actions.registerUserFailureAction(e.message));
    }
}

function* loginRequest(action) {
    let username = action.payload;
    try {
        const userExists = yield call(doesUserExist, username);
        if (userExists) {
            yield put(AppActions.loginAction(username));
        } else {
            yield put(Actions.loginRequestFailureAction(`${username} does not exist`));
        }
    } catch (e) {
        yield put(Actions.loginRequestFailureAction(e.message));
    }
}

function* validateUsernameUniqueSaga() {
    yield takeLatest(RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE, validateUsernameUnique);
}

function* registerUserSaga() {
    console.log('inside register user saga');
    yield takeLatest(RegistrationActionsConstants.REGISTER_USER, registerUser);
}

function* loginRequestSaga() {
    console.log('inside login request saga');
    yield takeLatest(RegistrationActionsConstants.LOGIN_REQUEST, loginRequest);
}

function* RegistrationSaga() {
    console.log('inside RegistrationSaga');
    yield all([
        validateUsernameUniqueSaga(),
        registerUserSaga(),
        loginRequestSaga()
    ]);
}

export default RegistrationSaga;
