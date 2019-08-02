import initialState from '../../initialState';
import {ProfileActionsConstants} from './constants.js';
import {fromJS} from "immutable";


const ProfileReducer = (state = initialState.profile, action) => {
    switch (action.type) {
        case ProfileActionsConstants.FETCH_PROFILE_SUCCESS:
        case ProfileActionsConstants.UPDATE_PROFILE_SUCCESS:
            return state.mergeDeep(fromJS(action.payload)).set('error', '');
        case ProfileActionsConstants.FETCH_PROFILE_FAILURE:
        case ProfileActionsConstants.UPDATE_PROFILE_FAILURE:
            return state.set('error', action.payload);
        case ProfileActionsConstants.DELETE_REVIEW_SUCCESS:
            return state.removeIn(['reviews', action.payload.reviewIndex]).set('error', '');
        case ProfileActionsConstants.CLEAR_PROFILE:
            return initialState.profile;
        default:
            return state;
    }
};

export default ProfileReducer
