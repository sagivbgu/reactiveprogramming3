import Actions from './actions'
import {call, put, takeLatest, all} from 'redux-saga/effects'
import {RestaurantsActions} from "../Restaurants/constants";


const FETCH_ALL_RESTAURANTS = '/api/restaurants/fetchall'
const ADD_REVIEW_URL = '/api/restaurant/addreview'
const ADD_RESTAURANT_URL = '/api/restaurant/addrestaurant'


function* fetchAllRestaurantsRequest(action) {
    try {
        const res = yield call(fetch, FETCH_ALL_RESTAURANTS);
        const json = yield call([res, 'json']); //retrieve body of response
        yield put(Actions.fetchAllRestaurantsResultAction(json));
    } catch (e) {
        // TOOD
    }
}

function* fetchAllRestaurantsSaga() {
    yield takeLatest(RestaurantsActions.FETCH_ALL_RESTAURANTS, fetchAllRestaurantsRequest);
}


function* addReview(action) {
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

function* addRestaurant(action) {
    try {
        let restaurant = action.payload;
        let {name, location, thumbnail, thumbnailHeight, thumbnailWidth} = restaurant;

        const res = yield call(fetch, ADD_RESTAURANT_URL,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({name, location, thumbnail, thumbnailHeight, thumbnailWidth})
            }
        );

        const json = yield call([res, 'json']); //retrieve body of response
        if (json.success) {
            yield put(Actions.addRestaurantResult(restaurant));
        } else {
            // TODO
        }
    } catch (e) {
        // TODO
    }
}

function* addReviewSaga() {
    yield takeLatest(RestaurantsActions.ADD_REVIEW, addReview);
}

function* addRestaurantSaga() {
    console.log('inside add restaurant saga');
    yield takeLatest(RestaurantsActions.ADD_RESTAURANT, addRestaurant);
}

function* RestaurantsSaga() {
    yield all([
        fetchAllRestaurantsSaga(),
        addReviewSaga(),
        addRestaurantSaga()
    ]);
}

export default RestaurantsSaga;
