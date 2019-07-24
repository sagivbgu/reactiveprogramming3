import initialState from '../../initialState';
import {RegistrationActionsConstants} from './constants.js';
import {List} from 'immutable';

const RegistrationReducer = (state = initialState.registration, action) => {
    switch (action.type) {
        case RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE_SUCCESS:
            console.log('setting usernameUnique to ' + action.payload.isUnique);
            return state.set('usernameUnique', action.payload.isUnique);
        case RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE_FAILURE:
            return state.set('usernameUnique', undefined).set('error', action.payload);
        case RegistrationActionsConstants.LOCATION_CHANGED:
            console.log('Location typed: ' + action.payload);
            return state.set('location', action.payload);
        case RegistrationActionsConstants.REGISTER_USER_FAILURE:
            console.log('Inside register user failure reducer');
            return state.set('error', action.payload);
        default:
            return state;
    }
};

export default RegistrationReducer
