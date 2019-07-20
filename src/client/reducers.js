import { combineReducers } from 'redux';
import GalleryReducer from './components/Gallery/reducer';
import AppReducer from './components/App/reducer';
import RegistrationReducer from "./components/Registration/reducer";



export default combineReducers({
  registration: RegistrationReducer,
  app: AppReducer,
  gallery: GalleryReducer
});
