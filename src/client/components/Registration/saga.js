import {RegistrationActionsConstants} from './constants'
import {call, put, takeLatest, all} from 'redux-saga/effects'
import Actions from './actions'

const VALIDATE_USERNAME_UNIQUE_URL = '';
const REGISTER_USER_URL = '/api/user/registration';

// TODO: DELETE and change logic to fetch data from server
let isEven = true;

function* validateUsernameUnique(action) {
    console.log('inside validateUsernameUnique Saga. Action=', action);
    if (isEven) {
        yield put(Actions.validateUsernameUniqueSuccessAction(action.payload.username, true));
        isEven = !isEven;
    } else {
        yield put(Actions.validateUsernameUniqueSuccessAction(action.payload.username, false));
        isEven = !isEven;
    }
    /*
        try {
            const res = yield call(fetch, VALIDATE_USERNAME_UNIQUE_URL,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                });

            const json = yield call([res, 'json']); //retrieve body of response

            yield put(Actions.validateUsernameUniqueSuccessAction(json));
        } catch (e) {
            yield put(Actions.loadTagsFailureAction(e.message));
        }*/
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function* registerUser(action) {
    console.log('inside registerUser Saga. Action=', action);

    const photoContentType = action.payload.photo.type;
    let {username, location} = action.payload;

    try {
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

        yield put(Actions.registerUserSuccessAction(json)); // TODO
    } catch (e) {
        yield put(Actions.registerUserFailureAction(e.message)); // TODO
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
