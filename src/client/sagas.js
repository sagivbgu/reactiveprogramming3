import { all } from 'redux-saga/effects'
import GallerySaga from './components/Gallery/saga'
import RegistrationSaga from "./components/Registration/saga";
import RestaurantsSaga from "./components/Restaurants/saga";

export default function* Sagas() {
    yield all([
        RegistrationSaga(),
        RestaurantsSaga()
    ])
}
