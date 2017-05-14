"use strict";

import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from "reudx-form";

export default combineReducers({
  form: formReducer,
});