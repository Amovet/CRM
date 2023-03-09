import {combineReducers, createStore, applyMiddleware} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import CallReducer from "./calls_reducer";
import AuthReducer from "./auth_reducer";


const initialState ={};

const middleware = [thunk];

let reducers = combineReducers({
    Auth:AuthReducer,
    Call:CallReducer,
});

const store = createStore(reducers, initialState, composeWithDevTools(applyMiddleware(...middleware)));
export default store