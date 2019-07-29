import {AppActionsConstants} from './constants.js';

function loginAction(username) {
    return {
        type: AppActionsConstants.LOGIN,
        payload: username
    }
}

function logoutAction(username) {
    return {
        type: AppActionsConstants.LOGOUT
    }
}

let AppActions = {
    loginAction,
    logoutAction
};

export default AppActions
