import initialState from '../../initialState';
//import {RegistrationActionsConstants} from './constants.js';
import {List} from 'immutable';
import {RegistrationActionsConstants} from "../Registration/constants";
import {RestaurantsActions} from "./constants";

const RestaurantsReducer = (state = initialState.restaurants, action) => {
    switch (action.type) {
        case RestaurantsActions.FETCH_ALL_RESTAURANTS_RESULT:
            return state.set('restaurants', List(action.payload.restaurants));
        default:
            return state;
    }
};

export default RestaurantsReducer
