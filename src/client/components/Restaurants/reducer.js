import initialState from '../../initialState';
import {Map, List} from 'immutable';
import {RestaurantsActions} from "./constants";

const RestaurantsReducer = (state = initialState.restaurants, action) => {
    switch (action.type) {
        case RestaurantsActions.FETCH_ALL_RESTAURANTS_RESULT:
            let restaurants = Object(action.payload.restaurants.map(restaurant => {
                    return [restaurant._id, {
                        ...restaurant,
                        reviews: List(restaurant.reviews),
                        src: restaurant.thumbnail,
                        thumbnailCaption: restaurant.name
                    }];
                }));
            return new Map(restaurants)

        case RestaurantsActions.ADD_REVIEW_RESULT:
            console.log('inside RestaurantReducer.ADD_REVIEW_RESULT', action.payload)
            let review = action.payload;
            return state.updateIn([review.restaurantId, 'reviews'], reviews => reviews.unshift(review));

        case RestaurantsActions.GET_RESTAURANT_REVIEWS_RESULT:
            console.log('inside RestaurantReducer.GET_RESTAURANT_REVIEWS_RESULT', action.payload);
            let reviews = action.payload;
            return state.setIn([review.restaurantId, 'reviews'], List(reviews));

        default:
            return state;
    }
};

export default RestaurantsReducer
