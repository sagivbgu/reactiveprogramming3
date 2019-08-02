import {RestaurantsActions} from "./constants";

function fetchAllRestaurantsRequest() {
    return {
        type: RestaurantsActions.FETCH_ALL_RESTAURANTS,
    }
}

function fetchAllRestaurantsSuccessResultAction(restaurants) {
    return {
        type: RestaurantsActions.FETCH_ALL_RESTAURANTS_SUCCESS_RESULT,
        payload: {
            restaurants: restaurants
        }
    }
}

function fetchAllRestaurantsFailureResultAction(errorMessage) {
    return {
        type: RestaurantsActions.FETCH_ALL_RESTAURANTS_FAILURE_RESULT,
        payload: errorMessage
    }
}

function addReview(review) {
    return {
        type: RestaurantsActions.ADD_REVIEW,
        payload: review
    }
}

function addReviewSuccessResult(review) {
    return {
        type: RestaurantsActions.ADD_REVIEW_SUCCESS_RESULT,
        payload: review
    }
}

function addReviewFailureResult(errorMessage) {
    return {
        type: RestaurantsActions.ADD_REVIEW_FAILURE_RESULT,
        payload: errorMessage
    }
}

function addRestaurant(restaurant) {
    return {
        type: RestaurantsActions.ADD_RESTAURANT,
        payload: restaurant
    }
}

function addRestaurantSuccessResult(restaurant) {
    return {
        type: RestaurantsActions.ADD_RESTAURANT_SUCCESS_RESULT,
        payload: restaurant
    }
}

function addRestaurantFailureResult(errorMessage) {
    return {
        type: RestaurantsActions.ADD_RESTAURANT_FAILRE_RESULT,
        payload: errorMessage
    }
}

function searchRestaurantAction(query, byName, byLocation) {
    return {
        type: RestaurantsActions.SEARCH_RESTAURANT,
        payload: {
            query,
            byName,
            byLocation
        }
    }
}

function searchRestaurantSuccessAction(restaurants) {
    return {
        type: RestaurantsActions.SEARCH_RESTAURANT_SUCCESS,
        payload: restaurants
    }
}

function searchRestaurantFailureAction(error) {
    return {
        type: RestaurantsActions.SEARCH_RESTAURANT_FAILURE,
        payload: error
    }
}

let actions = {
    fetchAllRestaurantsSuccessResultAction,
    fetchAllRestaurantsFailureResultAction,
    fetchAllRestaurantsRequest,
    addReview,
    addReviewSuccessResult,
    addReviewFailureResult,
    addRestaurant,
    addRestaurantSuccessResult,
    addRestaurantFailureResult,
    searchRestaurantAction,
    searchRestaurantSuccessAction,
    searchRestaurantFailureAction
};

export default actions
