import axios from "axios";

const GET_CHALLENGELINES = "GET_CHALLENGELINES";
const ADD_CHALLENGELINE = "ADD_CHALLENGELINE";
const REMOVE_CHALLENGELINE = "REMOVE_CHALLENGELINE";

export const getChallengeLines = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const challengeLines = (
        await axios.get("/api/challengeLine/", {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: GET_CHALLENGELINES, challengeLines });
    }
  };
};

export const addChallengeLine = (challenge) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const newLine = (
        await axios.post("/api/challengeLine/", challenge, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: ADD_CHALLENGELINE, newLine });
    }
  };
};

export const removeChallengeLine = (line) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const shorterSet = (
        await axios.delete("/api/challengeLine/", line, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: REMOVE_CHALLENGELINE, shorterSet });
    }
  };
};


export default function (state = [], action) {
  switch (action.type) {
    case GET_CHALLENGELINES:
      return action.challengeLines;
    case ADD_CHALLENGELINE:
      return action.newLine
    case REMOVE_CHALLENGELINE:
      return action.shorterSet
    default:
      return state;
  }
}
