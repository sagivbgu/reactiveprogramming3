import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router-dom'
import App from './components/App/index';
import history from './history'
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reducers from './reducers';
import createSagaMiddleware from 'redux-saga';
import Sagas from './sagas';
//import theme - change nova-light to other theme as needed
import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import Registration from "./components/Registration";
import Restaurants from "./components/Restaurants/Restaurants";

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

// TODO: Change
ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route exact path="/" component={App} />
        </Router>
    </Provider>,
    document.getElementById("app")
);

