import { combineReducers } from 'redux';
import AppReducer from './components/App/reducer';
import RegistrationReducer from "./components/Registration/reducer";
import RestaurantsReducer from "./components/Restaurants/reducer";
import ProfileReducer from "./components/Profile/reducer";



export default combineReducers({
  app: AppReducer,
  registration: RegistrationReducer,
  profile: ProfileReducer,
  restaurants: RestaurantsReducer
});
