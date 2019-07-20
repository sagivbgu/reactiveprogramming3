import initialState from '../../initialState';
import {RegistrationActionsConstants} from './constants.js';
import {List} from 'immutable';

const RegistrationReducer = (state = initialState.registration, action) => {
    switch (action.type) {
        case RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE_SUCCESS:
            console.log('setting usernameUnique to ' + action.payload.isUnique);
            return state.set('usernameUnique', action.payload.isUnique);
        default:
            return state;
    }
};

export default RegistrationReducer
