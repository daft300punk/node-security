"use strict";

import * as types from "../constants/actionTypes";
import authenticationApi from "../api-services/authenticationApi";
import { routerActions } from "react-router-redux;

function userDateUpdate(user) {
  return {
    type: types.USERDATE_UPDATED,
    user
  }
}

function userAuthenticationRequested() {
  return {
    type: types.LOGIN_REQUEST,
    isAuthenticated: false,
    isRequested: true,
  }
}

function userAuthenticationSuccess(user) {
  return {
    type: types.LOGIN_SUCCESS,
    isRequested: false,
    isAuthenticated: true,
    user
  }
}

function userAuthenticationFailure(user) {
  return {
    type: types.LOGIN_FAILURE,
    isAuthenticated: false,
    isRequested: false,
    error
  }
}

function userLogoutRequested() {
  return {
    type: types.LOGOUT_REQUEST,
    isRequested: true,
  }
}

function userLogoutSuccessful() {
  return {
    type: types.LOGOUT_SUCCESS,
    isRequested: false,
  }
}

function userLogoutFailure(errorMessage) {
  return {
    type: types.LOGOUT_FAILURE,
    isRequested: true,
    errorMessage
  }
}

function userRegistrationRequested() {
  return {
    type: types.REGISTRATION_REQUEST,
    isRequested: true,
    isRegistered: false
  }
}

function userRegistrationSuccess(message) {
  return {
    type: types.REGISTRATION_SUCCESS,
    isRequested: false,
    isRegistered: true,
    message
  }
}

function userRegistrationFailure(errors) {
  return {
    type: types.REGISTRATION_FAILURE,
    isRegistered: false,
    isRequested: false,
    errors
  }
}

