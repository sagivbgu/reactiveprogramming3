import initialState from '../../initialState';
import {RegistrationActionsConstants} from './constants.js';

const RegistrationReducer = (state = initialState.registration, action) => {
    switch (action.type) {
        case RegistrationActionsConstants.SET_USERNAME:
            let username = action.payload;
            return state.set('username', username);
        case RegistrationActionsConstants.LOGIN_REQUEST_FAILURE:
            return state.set('error', action.payload);
        case RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE_SUCCESS:
            console.log('setting usernameUnique to ' + action.payload);
            return state.set('usernameUnique', action.payload);
        case RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE_FAILURE:
            return state.set('usernameUnique', undefined).set('error', action.payload);
        case RegistrationActionsConstants.LOCATION_CHANGED:
            console.log('Location typed: ' + action.payload);
            return state.set('location', action.payload);
        case RegistrationActionsConstants.REGISTER_USER_FAILURE:
            console.log('Inside register user failure reducer');
            return state.set('error', action.payload);
        case RegistrationActionsConstants.CLEAR_ERROR:
            return state.set('error', '');
        default:
            return state;
    }
};

export default RegistrationReducer
