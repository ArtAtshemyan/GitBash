import {createStore, combineReducers, applyMiddleware} from "redux";
import usersReducer from "./reducer/usersReducer";
import createSagaMiddlewere from 'redux-saga';
import rootWatcher from "../saga";

const sagaMiddleWere = createSagaMiddlewere();
const rootReducer = combineReducers({
    usersDataReducer:usersReducer,

})
const store = createStore(rootReducer,applyMiddleware(sagaMiddleWere));
sagaMiddleWere.run(rootWatcher);
export default store;
