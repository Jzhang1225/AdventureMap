import axios from "axios";

const GET_CHALLENGELINES = "GET_CHALLENGELINES";

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

export default function (state = [], action) {
  switch (action.type) {
    case GET_CHALLENGELINES:
      return action.challengeLines;
    default:
      return state;
  }
}
