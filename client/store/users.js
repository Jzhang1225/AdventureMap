import axios from "axios";

const SET_USERS = "SET_USERS";

export const setUsers = () => {
  return async (dispatch) => {
    const users = (await axios.get("/api/users/")).data;
    dispatch({ type: SET_USERS, users });
  };
};

export default function (state = [], action) {
  switch (action.type) {
    case SET_USERS:
      return action.users;
    default:
      return state;
  }
}
