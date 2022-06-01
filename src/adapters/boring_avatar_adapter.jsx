import axios from "axios";
const API_URL = "https://source.boringavatars.com/beam"; 
const FRONTEND_URL = "http://localhost:3000"

export const renderAvatar = (username, size) => {
  return axios.get(API_URL + `/${size}/` + username, 
    { headers: {
      'Access-Control-Allow-Origin': FRONTEND_URL,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      }
  })
};
