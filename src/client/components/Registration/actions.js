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

let actions = {
    validateUsernameUniqueAction,
    validateUsernameUniqueSuccessAction,
    locationChangedAction
};

export default actions
