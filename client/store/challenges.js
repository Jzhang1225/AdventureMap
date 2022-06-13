import axios from "axios";

const GET_CHALLENGES = "GET_CHALLENGES";
const CREATE_CHALLENGE = "CREATE_CHALLENGE";

export const getChallenges = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const challenges = (
        await axios.get("/api/challenges/", {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: GET_CHALLENGES, challenges });
    }
  };
};

export const createChallenge = (newChallenge) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const challenge = (
        await axios.post("/api/challenges/", newChallenge, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: CREATE_CHALLENGE, challenge });
    }
  };
};


export default function (state = [], action) {
  switch (action.type) {
    case GET_CHALLENGES:
      return action.challenges;
    case CREATE_CHALLENGE:
      return [...state, action.challenge]
    default:
      return state;
  }
}
