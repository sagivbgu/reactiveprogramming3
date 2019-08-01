const {List, Map} = require('immutable');
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default {
    app: Map({
        loggedUser: cookies.get('loggedUser') || undefined
    }),
    registration: Map({
        username: '',
        usernameUnique: undefined,
        location: '',
        error: ''
    }),
    profile: Map({
        username: '',
        location: '',
        photo: Map({
            data: null,
            contentType: ''
        }),
        reviews: [],
        error: ''
    }),
    userSearch: Map({
        results: [],
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
};
