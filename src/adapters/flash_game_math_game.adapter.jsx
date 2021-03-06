import axios from "axios";
const BACK_END_URL = "http://localhost:8080/api";
const FRONT_END_URL = "http://localhost:3000";

export const getChallenge = (token, isNewGame, gameDifficulty) => {
  return axios.post(BACK_END_URL + "/math/challenge/new", {
    "isNewGame": isNewGame,
    "gameDifficulty": gameDifficulty
    },
    { headers: {
      "Authorization": token,
      'Access-Control-Allow-Origin': FRONT_END_URL,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization"  
      }
  });
};

export const checkOnGoingChallenge = (token) => {
  return axios
    .get(BACK_END_URL + "/math/challenge/check-session",
    { headers: {
      "Authorization": token,
      'Access-Control-Allow-Origin': FRONT_END_URL,
      "Access-Control-Allow-Methods": "GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization"
      }
    });
};

export const submitChallengeResult = (token, isChallengePassed, answerTimeInMillis) => {
  return axios
    .post(BACK_END_URL + "/math/challenge/result", {
      "challengePassed": isChallengePassed ? 1 : 0,
      "answerTimeInMillis": answerTimeInMillis
    },
    { headers: {
      "Authorization": token,
      'Access-Control-Allow-Origin': FRONT_END_URL,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization"
      }
    });
};

export const completeChallenge = (token) => {
  return axios
    .put(BACK_END_URL + "/math/challenge/complete", {
    },
    { headers: {
      "Authorization": token,
      "Access-Control-Allow-Origin": FRONT_END_URL,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization"
      }
    });
};

export const getLeaderBoard = (token) => {
  return axios
    .get(BACK_END_URL + "/scores/top-100-leaders", {
    },
    { headers: {
      "Authorization": token,
      "Access-Control-Allow-Origin": FRONT_END_URL,
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type,Authorization"
      }
    });
};