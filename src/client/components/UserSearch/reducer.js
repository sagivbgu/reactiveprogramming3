import initialState from '../../initialState';
import {UserSearchActionsConstants} from './constants.js';

const UserSearchReducer = (state = initialState.userSearch, action) => {
    switch (action.type) {
        case UserSearchActionsConstants.SEARCH_USER_SUCCESS:
            return state.set('results', action.payload).set('error', '');
        case UserSearchActionsConstants.SEARCH_USER_FAILURE:
            return state.set('error', action.payload);
        default:
            return state;
    }
};

export default UserSearchReducer
