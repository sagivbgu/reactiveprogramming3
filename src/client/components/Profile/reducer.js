import initialState from '../../initialState';
import {ProfileActionsConstants} from './constants.js';


const ProfileReducer = (state = initialState.profile, action) => {
    switch (action.type) {
        case ProfileActionsConstants.FETCH_PROFILE_SUCCESS:
        case ProfileActionsConstants.UPDATE_PROFILE_SUCCESS:
            return state.mergeDeep(action.payload).set('error','');
        case ProfileActionsConstants.FETCH_PROFILE_FAILURE:
        case ProfileActionsConstants.UPDATE_PROFILE_FAILURE:
            return state.set('error', action.payload);
        default:
            return state;
    }
};

export default ProfileReducer
