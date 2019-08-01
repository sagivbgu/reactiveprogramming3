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

function clearUserSearchAction() {
    return {
        type: UserSearchActionsConstants.CLEAR_USER_SEARCH
    }
}

let actions = {
    searchUserAction,
    searchUserSuccessAction,
    searchUserFailureAction,
    clearUserSearchAction
};

export default actions
