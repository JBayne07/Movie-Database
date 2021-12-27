import { combineReducers } from "redux";
import userDataReducer from "./userData";

const allReducers = combineReducers({
    userdata: userDataReducer
});

export default allReducers;