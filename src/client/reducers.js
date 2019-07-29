import { combineReducers } from 'redux';
import GalleryReducer from './components/Gallery/reducer';
import AppReducer from './components/App/reducer';
import RegistrationReducer from "./components/Registration/reducer";
import RestaurantsReducer from "./components/Restaurants/reducer";


export default combineReducers({
  registration: RegistrationReducer,
  restaurants: RestaurantsReducer,
  app: AppReducer
});
