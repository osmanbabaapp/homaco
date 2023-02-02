import { combineReducers } from "redux";

// import all reducers
import { drawerReducer } from "./drawer/reducers";

// COMBINED REDUCERS
const reducers = {
  drawer: drawerReducer,
};

export default combineReducers(reducers);
