const {List, Map} = require('immutable');

export default {
    registration: Map({
        usernameUnique: false,
        location: '',
        error: ''
    }),

    restaurants: Map({
            restaurants: List()
    }),
    //     List([
    //     {
    //         src: "https://i.ytimg.com/vi/nS-v5-Y1y0Q/maxresdefault.jpg",
    //         thumbnail: "https://i.ytimg.com/vi/nS-v5-Y1y0Q/maxresdefault.jpg",
    //         thumbnailWidth: 320,
    //         thumbnailHeight: 212,
    //         thumbnailCaption: "Karnaf",
    //         name: "Karnaf",
    //         location: "Tel-Aviv"
    //     },
    //
    //     {
    //         src: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Aroma_espreso_bar_logo.jpg/220px-Aroma_espreso_bar_logo.jpg",
    //         thumbnail: "https://upload.wikimedia.org/wikipedia/en/thumb/0/0e/Aroma_espreso_bar_logo.jpg/220px-Aroma_espreso_bar_logo.jpg",
    //         thumbnailWidth: 320,
    //         thumbnailHeight: 212,
    //         thumbnailCaption: "Aroma",
    //         name: "Aroma",
    //         location: "Beer-Sheba"
    //     }
    // ]),

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
