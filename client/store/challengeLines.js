import axios from "axios";
import history from "../history";

const GET_CHALLENGELINES = "GET_CHALLENGELINES";
const ADD_CHALLENGELINE = "ADD_CHALLENGELINE";
const REMOVE_CHALLENGELINE = "REMOVE_CHALLENGELINE";
const FINISH_CHALLENGELINE = "FINISH_CHALLENGELINE";

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
      await axios.delete(`/api/challengeLine/${line.id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: REMOVE_CHALLENGELINE, line });
    }
  };
};

export const completeChallengeLine = (line) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const updatedLine = (
        await axios.put(`/api/challengeLine/${line.id}`, line, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: FINISH_CHALLENGELINE, updatedLine });
      history.push("/explore/");
    }
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case GET_CHALLENGELINES:
      return action.challengeLines;
    case ADD_CHALLENGELINE:
      return action.newLine;
    case REMOVE_CHALLENGELINE:
      return state.filter(
        (challengeLine) => challengeLine.id !== action.line.id
      );
    case FINISH_CHALLENGELINE:
      return state.map((line) => {
        if (line.id == action.updatedLine.id) {
          return action.updatedLine;
        } else {
          return line;
        }
      });
    default:
      return state;
  }
}
