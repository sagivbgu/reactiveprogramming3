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

let actions = {
    fetchAllRestaurantsResultAction,
    fetchAllRestaurantsRequest,
    addReview,
    addReviewResult,
};

export default actions
