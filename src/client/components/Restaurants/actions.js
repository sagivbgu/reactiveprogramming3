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

function clearRestaurantSearchAction() {
    return {
        type: RestaurantsActions.CLEAR_RESTAURANT_SEARCH
    }
}

let actions = {
    fetchAllRestaurantsResultAction,
    fetchAllRestaurantsRequest,
    addReview,
    addReviewResult,
    addRestaurant,
    addRestaurantResult,
    searchRestaurantAction,
    searchRestaurantSuccessAction,
    searchRestaurantFailureAction,
    clearRestaurantSearchAction
};

export default actions
