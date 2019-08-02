[ID] [NAME]
[ID] [NAME]

- Project design
    - **TODO**

- Features implemented, the Model you’ve implemented using Mongoose
    - **TODO**

- Flow example: Searching a user 
    - In user search screen (`UserSearch` component), text is inserted to the search bar.
    - On enter or search button clicked, `searchUserAction` is created, containing the search query.
    - `UserSearchSaga` catches this action and initiated a GET request to `/api/user/search` with the search query as a URL parameter.
    - Using mongoose, the server finds `UserModel` documents in the DB that their username OR location field equals the search query.
    - If an error occurs,
        - A json containing the error message is returned to the saga.
        - The saga creates a `searchUserFailureAction`, containing the error message.
        - `UserSearchReducer` catches this action and updates the state with the error string (`state.userSearch.error`).
        - `UserSearch` component renders the error to the UI as a red message.
    - On success,
        - An array with the matching usernames is returned to the saga.
        - The saga creates a `searchUserSuccessAction`, containing the matching usernames.
        - `UserSearchReducer` catches this action and updates the state (`state.userSearch.results` with the results,
        and `state.userSearch.error` with an empty string).
        - `UserSearch` component renders the results to the UI as a list of links to the users profiles.


 - Extra libraries used
    - react-autosuggest: For locations auto-complete on registration.
    - react-search-field: For searching user name and restaurants.
    - react-dropzone: For uploading photos.
    - react-rating: For showing the restaurants' ratings (stars).
    - react-grid-gallery: For showing the restaurants in the search page.
    - react-select: **TODO**
    - moment: **TODO**
    - **TODO: Where did we get the style (css) from?** 

