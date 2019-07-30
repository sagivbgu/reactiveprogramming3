import {ProfileActionsConstants} from './constants';

function fetchProfileRequestAction(username) {
    return {
        type: ProfileActionsConstants.FETCH_PROFILE_REQUEST,
        payload: username
    }
}

function fetchProfileSuccessAction(profile) {
    return {
        type: ProfileActionsConstants.FETCH_PROFILE_SUCCESS,
        payload: profile
    }
}

function fetchProfileFailureAction(error) {
    return {
        type: ProfileActionsConstants.FETCH_PROFILE_FAILURE,
        payload: error
    }
}

let actions = {
    fetchProfileRequestAction,
    fetchProfileFailureAction,
    fetchProfileSuccessAction
};

export default actions
