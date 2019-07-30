import { all } from 'redux-saga/effects'
import RegistrationSaga from "./components/Registration/saga";
import ProfileSaga from "./components/Profile/saga";
import RestaurantsSaga from "./components/Restaurants/saga";

export default function* Sagas() {
    yield all([
        RegistrationSaga(),
        ProfileSaga(),
        RestaurantsSaga()
    ])
}
