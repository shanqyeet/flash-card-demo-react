import axios from "axios";
const BACK_END_URL = "http//localhost:8080/api"
const FRONT_END_URL = "http://localhost:3000"

export const userSignup = (username, password, confirmPassword, avatarUrl) => {
  return axios.post(BACK_END_URL + "/users/new", {
    username,
    password,
    confirmPassword,
    avatarUrl,
    },
    { headers: {
      'Access-Control-Allow-Origin': FRONT_END_URL,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
      }
  });
};

export const userSigin = (username, password) => {
  return axios
    .post(BACK_END_URL + "/users/login", {
      username,
      password,
    },
    { headers: {
      'Access-Control-Allow-Origin': FRONT_END_URL,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token"
      }
    });
};

export const userSignout = () => {
  localStorage.removeItem("user");
};
