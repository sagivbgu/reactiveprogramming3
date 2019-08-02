import React from 'react';
import ReactDOM from 'react-dom';
import {Route, BrowserRouter} from "react-router-dom";
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import Sagas from './sagas';

import Registration from "./components/Registration";
import Login from "./components/Registration/Login";
import App from "./components/App/App";
import HomePage from "./components/HomePage/HomePage";
import Restaurant from "./components/Restaurant/Restaurant";
import UserSearch from "./components/UserSearch/UserSearch";
import Profile from "./components/Profile/Profile";
import AddRestaurant from "./components/Restaurants/AddRestaurant";

//create saga middleware
const sagaMiddleware = createSagaMiddleware();

//create store, add reducers, attach saga
const store = createStore(
    reducers,
    applyMiddleware(sagaMiddleware)
);

//run saga(s)
sagaMiddleware.run(Sagas);

// Render the main component into the dom
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <Route path="/" exact component={App}/>
            <Route path="/home/" component={HomePage}/>
            <Route path="/login/" component={Login}/>
            <Route path="/registration/" component={Registration}/>
            <Route path="/user/search/" component={UserSearch}/>
            <Route path="/user/profile/:user" component={Profile}/>
            <Route exact path="/restaurants/:restaurantIndex" component={Restaurant} />
            <Route exact path="/restaurants/add" component={AddRestaurant} />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app'));
