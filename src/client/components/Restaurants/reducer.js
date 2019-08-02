import initialState from '../../initialState';
import {Map, List} from 'immutable';
import {RestaurantsActions} from "./constants";

const RestaurantsReducer = (state = initialState.restaurants, action) => {
    switch (action.type) {
        case RestaurantsActions.FETCH_ALL_RESTAURANTS_RESULT:
            let restaurants = Object(action.payload.restaurants.map(restaurant => {
                    return [restaurant._id, {
                        ...restaurant,
                        reviews: List(restaurant.reviews.map(review => {
                            return {
                                ...review,
                                date: new Date(review.date)
                            }
                        })),
                        src: restaurant.thumbnail,
                        thumbnailCaption: restaurant.name
                    }];
                }));
            return new Map(restaurants);

        case RestaurantsActions.ADD_REVIEW_RESULT:
            console.log('inside RestaurantReducer.ADD_REVIEW_RESULT', action.payload)
            let review = action.payload;
            return state.updateIn([review.restaurantId, 'reviews'], reviews => reviews.unshift(review));

        default:
            return state;
    }
};

export default RestaurantsReducer
