"use strict";

import {combineReducers} from "redux";
import {routerReducer} from "react-router-redux";
import {reducer as formReducer} from "reudx-form";
import timelineReducer from './timelineReducer';
import loginReducer from './loginReducer';

export default combineReducers({
  form: formReducer,
  timelineState: timelineReducer,
  loginState: loginReducer
});