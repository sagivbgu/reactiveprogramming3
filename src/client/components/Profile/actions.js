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

function updateProfileRequestAction(username, profile) {
    return {
        type: ProfileActionsConstants.UPDATE_PROFILE_REQUEST,
        username: username,
        payload: profile
    }
}

function updateProfileSuccessAction(profile) {
    return {
        type: ProfileActionsConstants.UPDATE_PROFILE_SUCCESS,
        payload: profile
    }
}

function updateProfileFailureAction(error) {
    return {
        type: ProfileActionsConstants.UPDATE_PROFILE_FAILURE,
        payload: error
    }
}

function deleteReviewAction(reviewId, reviewIndex) {
    return {
        type: ProfileActionsConstants.DELETE_REVIEW,
        payload: {
            reviewId: reviewId,
            reviewIndex: reviewIndex
        }
    }
}

function deleteReviewSuccessAction(deletedReviewIndex) {
    return {
        type: ProfileActionsConstants.DELETE_REVIEW_SUCCESS,
        payload: {
            reviewIndex: deletedReviewIndex
        }
    }
}

function clearProfileAction() {
    return {
        type: ProfileActionsConstants.CLEAR_PROFILE
    }
}

let actions = {
    fetchProfileRequestAction,
    fetchProfileFailureAction,
    fetchProfileSuccessAction,
    updateProfileRequestAction,
    updateProfileSuccessAction,
    updateProfileFailureAction,
    deleteReviewAction,
    deleteReviewSuccessAction,
    clearProfileAction
};

export default actions
