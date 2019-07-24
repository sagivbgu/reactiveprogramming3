const {List, Map} = require('immutable');

export default {
    registration: Map({
        usernameUnique: false,
        location: '',
        error: ''
    }),
    gallery: Map({
        images: List(),
        openLightBox: false,
        activeImage: 0,
        activeFilter: List(),
        galleryWidth: 0
    }),
    app: Map({
        size: 200,
        tag: 'art',
        tags: List()
    })
};
