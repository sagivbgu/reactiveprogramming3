import {RegistrationActionsConstants} from './constants'
import {call, put, takeLatest} from 'redux-saga/effects'
import Actions from './actions'

const VALIDATE_USERNAME_UNIQUE_URL = '';

// TODO: DELETE and change logic to fetch data from server
let isEven = true;

function* validateUsernameUnique(action) {
    console.log('RegistrationSaga=', action);
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

function* RegistrationSaga() {
    yield takeLatest(RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE, validateUsernameUnique);
}

export default RegistrationSaga;
