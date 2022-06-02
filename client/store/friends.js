import axios from "axios";

const SET_FRIENDS = "SET_FRIENDS";

export const setFriends = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const friendsList = (
        await axios.get("/api/friendrequests/", {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: SET_FRIENDS, friendsList });
    }
  };
};

export const resetFriends = () => {
  return {
    type: SET_FRIENDS,
    friendsList: [],
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_FRIENDS:
      return action.friendsList;
    default:
      return state;
  }
}
