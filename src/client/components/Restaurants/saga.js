import Actions from './actions'
import {call, put, takeLatest, all} from 'redux-saga/effects'
import {RestaurantsActions} from "../Restaurants/constants";


const FETCH_ALL_RESTAURANTS = '/api/restaurants/fetchall';
const ADD_REVIEW_URL = '/api/restaurant/addreview';
const ADD_RESTAURANT_URL = '/api/restaurant/addrestaurant';
const SEARCH_RESTAURANTS_URL = '/api/restaurants/search';

function* fetchAllRestaurantsRequest(action) {
    try {
        const res = yield call(fetch, FETCH_ALL_RESTAURANTS);
        const json = yield call([res, 'json']); //retrieve body of response
        yield put(Actions.fetchAllRestaurantsSuccessResultAction(json));
    } catch (e) {
        yield put(Actions.fetchAllRestaurantsFailureResultAction(e.message));
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
            yield put(Actions.addReviewSuccessResult(review));
        } else {
            yield put(Actions.addReviewFailureResult("unexpected failure"));
        }
    } catch (e) {
        yield put(Actions.addReviewFailureResult(e.message()));
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
            yield put(Actions.addRestaurantSuccessResult(restaurant));
        } else {
            yield put(Actions.addRestaurantFailureResult("unexpected failure"));
        }
    } catch (e) {
        yield put(Actions.addRestaurantFailureResult(e.message()));
    }
}

function* searchRestaurant(action) {
    try {
        let params = new URLSearchParams();
        params.append('query', encodeURIComponent(action.payload.query));
        params.append('byName', action.payload.byName);
        params.append('byLocation', action.payload.byLocation);

        const res = yield call(fetch, SEARCH_RESTAURANTS_URL + '?' + params);
        const json = yield call([res, 'json']); //retrieve body of response

        if (json.error) {
            yield put(Actions.searchRestaurantFailureAction(json.error));
        } else {
            yield put(Actions.searchRestaurantSuccessAction(json));
        }
    } catch (e) {
        yield put(Actions.searchRestaurantFailureAction(e.message));
    }
}

function* addReviewSaga() {
    yield takeLatest(RestaurantsActions.ADD_REVIEW, addReview);
}

function* addRestaurantSaga() {
    console.log('inside add restaurant saga');
    yield takeLatest(RestaurantsActions.ADD_RESTAURANT, addRestaurant);
}

function* searchRestaurantSaga() {
    console.log('inside search restaurant saga');
    yield takeLatest(RestaurantsActions.SEARCH_RESTAURANT, searchRestaurant);
}

function* RestaurantsSaga() {
    yield all([
        fetchAllRestaurantsSaga(),
        addReviewSaga(),
        addRestaurantSaga(),
        searchRestaurantSaga()
    ]);
}

export default RestaurantsSaga;
