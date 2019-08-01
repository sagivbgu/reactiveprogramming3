import Actions from './actions'
import {call, put, takeLatest, all} from 'redux-saga/effects'
import {RestaurantsActions} from "../Restaurants/constants";


const FETCH_ALL_RESTAURANTS = '/api/restaurants/fetchall'
const ADD_REVIEW_URL = '/api/restaurant/addreview'


function* fetchAllRestaurantsRequest(action) {
    console.log('inside fetchAllRestaurants Saga. Action=', action);
    try {
        const res = yield call(fetch, FETCH_ALL_RESTAURANTS);
        const json = yield call([res, 'json']); //retrieve body of response
        yield put(Actions.fetchAllRestaurantsResultAction(json));
    } catch (e) {
        // TOOD
    }
}

function* fetchAllRestaurantsSaga() {
    console.log('inside login request saga');
    yield takeLatest(RestaurantsActions.FETCH_ALL_RESTAURANTS, fetchAllRestaurantsRequest);
}


function* addReview(action) {
    console.log('inside addReview saga. Action=', action);
    try {
        let review = action.payload;
        let {restaurantId, reviewerUsername, text, date, ratings} = review;

        const res = yield call(fetch, ADD_REVIEW_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({restaurantId, reviewerUsername, text, date, ratings})
            }
        );

        const json = yield call([res, 'json']); //retrieve body of response
        if (json.success) {
            yield put(Actions.addReviewResult(review));
        } else {
            // TODO
        }
    } catch (e) {
        // TODO
    }
}

function* addReviewSaga() {
    console.log('inside add review saga');
    yield takeLatest(RestaurantsActions.ADD_REVIEW, addReview);
}

function* RestaurantsSaga() {
    console.log('inside RegistrationSaga');
    yield all([
        fetchAllRestaurantsSaga(),
        addReviewSaga(),
    ]);
}

export default RestaurantsSaga;
