import {
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";

import AuthService from "../services/auth.service";

export const login = (username, password) => (dispatch) => {
  return AuthService.login(username, password).then(
    (data) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data },
      });

      return Promise.resolve();
    },
    (error) => {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      dispatch({
        type: LOGIN_FAIL,
      });

      return Promise.reject();
    }
  );
};

export const logout = () => (dispatch) => {
  return AuthService.logout().then(
      (data) => {
        dispatch({
          type: LOGOUT,
        });

        return Promise.resolve();
      });
};
