import axios from "axios";
import authHeader from "./auth-header";
import jwtDecode from "jwt-decode";

const API_URL = "http://localhost:3000/";

const login = (email, password) => {
  return axios
    .post(API_URL + "login", {
      email,
      password,
    })
    .then((response) => {
      if (response.data.access_token) {
        localStorage.setItem("access_token", response.data.access_token);
        localStorage.setItem("user", JSON.stringify(jwtDecode(response.data.access_token)));
      }
      return response.data;
    });
};

const logout = () => {
  return axios
      .post(API_URL + "logout",
          {},
          {headers: authHeader()
      })
      .then((response) => {
          localStorage.removeItem("user");
          localStorage.removeItem("access_token");
          return response.data;
      });
};

export default {
  login,
  logout,
};
