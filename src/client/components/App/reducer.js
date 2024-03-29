import initialState from '../../initialState';
import {AppActionsConstants} from './constants.js';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const AppReducer = (state = initialState.app, action) => {
    console.log('AppReducerState=', state);
    console.log('RECEIVED ACTION:', action);
    switch (action.type) {
        case AppActionsConstants.LOGIN:
            let usernameToLogin = action.payload;
            console.log('Logging in user ' + usernameToLogin);
            cookies.set('loggedUser', usernameToLogin, {path: '/'});
            return state.set('loggedUser', usernameToLogin);
        case AppActionsConstants.LOGOUT:
            console.log('Logging out');
            cookies.remove('loggedUser');
            return state.set('loggedUser', undefined);
        default: //otherwise state is lost!
            return state;
    }
};

export default AppReducer
