[ID] [NAME]
[ID] [NAME]

- Project design
    - App:
    	* Check if the user is already loggged in (using cookies), if it is, redirects it to HomePage,
    	  if not, redirects to login page.

    - Registration:
    	* Implements the whole login/register mechanism.

    - HomePage:
    	* The first page the user sees (after a successful login).
    	* Contains links to the whole system.

    - Profile:
    	* Displays the profile of the logged user.

   	- UserSearch:
   		* Enables the user to search other users profiles.

    - Restaurants:
    	* Displays a gallery of restaurants. 
    	* The user is able to click on a specific picture (restaurant) and then enters to the restaurant.
    	* There is a "search restaurants" with auto-suggest feature, the user is able to search by name & location.
    	* Enables to add a new restaurant.

    - Restaurant:
    	* Displays the restaurant's name & location and it's reviews.
    	* Implements the required sorting/filtering reviews feature.



- Features implemented, the Model you’ve implemented using Mongoose
    - UserModel:
    	* Contains the details of a specific user: username, photo & location.

    - ReviewModel:
    	* Contains the required details of a review:
    		- restaurantId - the restaurant record the review was written for.
    		- reviewerUsername
    		- text - The review text.
    		- date - The date the review was submitted on.
    		- ratings - The ratings the user choosed.

    - RestaurantModel:
    	* Contains the details on a specific restaurant:
    		- name & location.
    		- thumbnail - A link of the restaurant photo that will be displayed in the gallery.
    		- thumbnailHeight & thumbnailWidth - The dimensions of the restaurant photo.


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
    - react-select: For the sorting & filtering dropdowns.
    - moment: For dealing with dates much easier.

