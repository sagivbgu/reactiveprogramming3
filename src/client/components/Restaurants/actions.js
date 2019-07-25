import {RestaurantsActions} from "./constants";

function fetchAllRestaurantsResultAction(restaurants) {
    return {
        type: RestaurantsActions.FETCH_ALL_RESTAURANTS_RESULT,
        payload: {
            restaurants: restaurants
        }
    }
}

let actions = {
    fetchAllRestaurantsResultAction,
};

export default actions