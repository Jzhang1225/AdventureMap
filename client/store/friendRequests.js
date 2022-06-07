import axios from "axios";

const SET_FRIENDREQUESTS = "SET_FRIENDREQUESTS";
const UPDATE_FRIENDREQUESTS = "UPDATE_FRIENDREQUESTS";

export const setFriendRequests = () => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const friendRequests = (
        await axios.get("/api/friendrequests/", {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: SET_FRIENDREQUESTS, friendRequests });
    }
  };
};

export const acceptRequest = (friendRequest) => {
  return async (dispatch) => {
    const token = window.localStorage.getItem("token");
    if (token) {
      const updatedFriendRequest = (
        await axios.put(`/api/friendrequests/${friendRequest.id}`, null, {
          headers: {
            authorization: token,
          },
        })
      ).data;
      dispatch({ type: UPDATE_FRIENDREQUESTS, updatedFriendRequest });
    }
  };
};

export const resetFriends = () => {
  return {
    type: SET_FRIENDREQUESTS,
    friendRequests: [],
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_FRIENDREQUESTS:
      return action.friendRequests;
    case UPDATE_FRIENDREQUESTS:
      return state.map((request) => {
        if (request.id === action.updatedFriendRequest.id)
          return action.updatedFriendRequest;
        else return request;
      });
    default:
      return state;
  }
}
