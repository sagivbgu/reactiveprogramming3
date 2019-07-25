import Actions from './actions'
import {call, put, takeLatest, all} from 'redux-saga/effects'
import {getBase64} from '../../utils'

const VALIDATE_USERNAME_UNIQUE_URL = 'api/user/exists';
const REGISTER_USER_URL = '/api/user/registration';
const FETCH_ALL_RESTAURANTS = '/api/restaurants/fetchall'

function* fetchAllRestaurants(action) {
    console.log('inside fetchAllRestaurants Saga. Action=', action);
    try {
        const res = yield call(fetch, FETCH_ALL_RESTAURANTS);
        const json = yield call([res, 'json']); //retrieve body of response
        yield put(Actions.fetchAllRestaurantsResultAction(json));
    } catch (e) {
        // TOOD: Change
        yield put(Actions.fetchAllRestaurantsResultAction(e.message));
    }
}

function* RestaurantsSaga() {
    console.log('inside RegistrationSaga');
    yield all([
        fetchAllRestaurants()
    ]);
}

export default RestaurantsSaga;
