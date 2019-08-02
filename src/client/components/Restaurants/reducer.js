import initialState from '../../initialState';
import {Map, List, fromJS} from 'immutable';
import {RestaurantsActions} from "./constants";

function getRestaurantsForState(restaurants) {
    let restaurantsObj = Object(restaurants.map(restaurant => {
        return [restaurant._id, {
            ...restaurant,
            reviews: List(restaurant.reviews.map(review => {
                return {
                    ...review,
                    date: new Date(review.date)
                }
            })),
            src: restaurant.thumbnail,
            thumbnailCaption: restaurant.name + ', ' + restaurant.location
        }];
    }));
    return new Map(restaurantsObj);
}

const RestaurantsReducer = (state = initialState.restaurants, action) => {
    switch (action.type) {
        case RestaurantsActions.FETCH_ALL_RESTAURANTS_RESULT:
            return getRestaurantsForState(action.payload.restaurants);

        case RestaurantsActions.ADD_REVIEW_RESULT:
            console.log('inside RestaurantReducer.ADD_REVIEW_RESULT', action.payload);
            let review = action.payload;
            return state.updateIn([review.restaurantId, 'reviews'], reviews => reviews.unshift(review));

        case RestaurantsActions.SEARCH_RESTAURANT_SUCCESS:
            return getRestaurantsForState(action.payload);

        case RestaurantsActions.SEARCH_RESTAURANT_FAILURE:
        default:
            return state;
    }
};

export default RestaurantsReducer
