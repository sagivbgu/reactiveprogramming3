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

function getRestaurantReviews(restaurantId) {
    return {
        type: RestaurantsActions.GET_RESTAURANT_REVIEWS,
        payload: restaurantId
    }
}

function getRestaurantReviewsResult(reviews) {
    return {
        type: RestaurantsActions.GET_RESTAURANT_REVIEWS_RESULT,
        payload: reviews
    }
}

let actions = {
    fetchAllRestaurantsResultAction,
    fetchAllRestaurantsRequest,
    addReview,
    addReviewResult,
    getRestaurantReviews,
    getRestaurantReviewsResult
};

export default actions
