import axios from "axios";

const UPDATE_POINTS = 'UPDATE_POINTS';

export const updatePoints = (id, points) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const updatedUser = (
        await axios.get(`/api/users/${id}`, points, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: UPDATE_POINTS, updatedUser });
    }
  };
}

export default function (state = [], action) {
  switch (action.type) {
    case UPDATE_POINTS:
      return action.updatedUser
    default:
      return state;
  }
}






