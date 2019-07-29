import {RegistrationActionsConstants} from './constants';

function setUsernameAction(username) {
    return {
        type: RegistrationActionsConstants.SET_USERNAME,
        payload: username
    }
}

function loginRequestAction(username) {
    return {
        type: RegistrationActionsConstants.LOGIN_REQUEST,
        payload: username
    }
}

function loginRequestFailureAction(failureMessage) {
    return {
        type: RegistrationActionsConstants.LOGIN_REQUEST_FAILURE,
        payload: failureMessage
    }
}

function validateUsernameUniqueAction(username) {
    return {
        type: RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE,
        payload: username
    }
}

function validateUsernameUniqueSuccessAction(isUnique) {
    return {
        type: RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE_SUCCESS,
        payload: isUnique
    }
}

function validateUsernameUniqueFailureAction(error) {
    return {
        type: RegistrationActionsConstants.VALIDATE_USERNAME_UNIQUE_FAILURE,
        payload: error
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

function clearErrorAction() {
    return {
        type: RegistrationActionsConstants.CLEAR_ERROR,
    }
}

let actions = {
    setUsernameAction,
    loginRequestAction,
    loginRequestFailureAction,
    validateUsernameUniqueAction,
    validateUsernameUniqueSuccessAction,
    validateUsernameUniqueFailureAction,
    locationChangedAction,
    registerUserAction,
    registerUserFailureAction,
    clearErrorAction
};

export default actions
