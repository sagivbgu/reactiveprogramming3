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

    restaurants: Map(
        // restaurantId: {
        //     _id: '',
        //     name: '',
        //     location: '',
        //     reviewsIds: List(),
        //     thumbnailLink: '',
        //     thumbnailWidth: 0,
        //     thumbnailHeight: 0
        // }
     ),

    app: Map({
        loggedUser: cookies.get('loggedUser') || undefined
    })
};
