import axios from "axios";
import cookie from "js-cookie";
const BACK_END_URL = "http://localhost:8080/api"
const FRONT_END_URL = "http://localhost:3000"

export const userSignup = (username, password, confirmPassword, avatarUrl) => {
  return axios.post(BACK_END_URL + "/users/registrations/new", {
    username,
    password,
    confirmPassword,
    avatarUrl,
    },
    { headers: {
      'Access-Control-Allow-Origin': FRONT_END_URL,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization"
      }
  });
};

export const userSigin = (username, password) => {
  return axios
    .post(BACK_END_URL + "/users/sessions/new", {
      username,
      password,
    },
    { headers: {
      'Access-Control-Allow-Origin': FRONT_END_URL,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization"
      }
    });
};

export const userSignout = () => {
  console.log("clearning cookies");
  cookie.set("accessToken", null);
  cookie.set("username", null);
};
