import {RegistrationActionsConstants} from './constants';

function validateUsernameUniqueAction(username) {
    return {
        type: RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE,
        payload: {
            username
        }
    }
}

function validateUsernameUniqueSuccessAction(username, isUnique) {
    return {
        type: RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE_SUCCESS,
        payload: {
            username,
            isUnique
        }
    }
}

function locationChangedAction(location) {
    return {
        type: RegistrationActionsConstants.LOCATION_CHANGED,
        payload: location
    }
}

function registerUserAction(username, location, photo) {
    return {
        type: RegistrationActionsConstants.REGISTER_USER,
        payload: {
            username,
            location,
            photo
        }
    }
}

function registerUserFailureAction(errorMessage) {
    return {
        type: RegistrationActionsConstants.REGISTER_USER_FAILURE,
        payload: errorMessage
    }
}

let actions = {
    validateUsernameUniqueAction,
    validateUsernameUniqueSuccessAction,
    locationChangedAction,
    registerUserAction,
    registerUserFailureAction
};

export default actions
