import {AppActionsConstants} from './constants.js';

function loginAction(username) {
    return {
        type: AppActionsConstants.LOGIN,
        payload: username
    }
}

let AppActions = {
    loginAction
};

export default AppActions
