import {all} from 'redux-saga/effects';
import userWatcher from "./usersSaga";


function* rootWatcher() {
    yield all([
        userWatcher(),
    ])
}
export default rootWatcher