const {List, Map} = require('immutable');
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default {
    registration: Map({
        username: '',
        usernameUnique: undefined,
        location: '',
        error: ''
    }),
    app: Map({
        loggedUser: cookies.get('loggedUser') || undefined
    })
};
