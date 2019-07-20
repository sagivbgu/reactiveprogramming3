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

let actions = {
    validateUsernameUniqueAction,
    validateUsernameUniqueSuccessAction
};

export default actions

