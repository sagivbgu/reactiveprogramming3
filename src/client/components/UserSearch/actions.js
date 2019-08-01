import {UserSearchActionsConstants} from './constants';

function searchUserAction(query) {
    return {
        type: UserSearchActionsConstants.SEARCH_USER,
        payload: query
    }
}
function searchUserSuccessAction(results) {
    return {
        type: UserSearchActionsConstants.SEARCH_USER_SUCCESS,
        payload: results
    }
}
function searchUserFailureAction(error) {
    return {
        type: UserSearchActionsConstants.SEARCH_USER_FAILURE,
        payload: error
    }
}

let actions = {
    searchUserAction,
    searchUserSuccessAction,
    searchUserFailureAction
};

export default actions
