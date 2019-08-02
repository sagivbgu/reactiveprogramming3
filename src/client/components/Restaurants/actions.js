import {RestaurantsActions} from "./constants";

function fetchAllRestaurantsRequest() {
    return {
        type: RestaurantsActions.FETCH_ALL_RESTAURANTS,
    }
}

function fetchAllRestaurantsResultAction(restaurants) {
    return {
        type: RestaurantsActions.FETCH_ALL_RESTAURANTS_RESULT,
        payload: {
            restaurants: restaurants
        }
    }
}

function addReview(review) {
    return {
        type: RestaurantsActions.ADD_REVIEW,
        payload: review
    }
}

function addReviewResult(review) {
    return {
        type: RestaurantsActions.ADD_REVIEW_RESULT,
        payload: review
    }
}

function addRestaurant(restaurant) {
    return {
        type: RestaurantsActions.ADD_RESTAURANT,
        payload: restaurant
    }
}

function addRestaurantResult(restaurant) {
    return {
        type: RestaurantsActions.ADD_RESTAURANT_RESULT,
        payload: restaurant
    }
}

let actions = {
    fetchAllRestaurantsResultAction,
    fetchAllRestaurantsRequest,
    addReview,
    addReviewResult,
    addRestaurant,
    addRestaurantResult
};

export default actions
