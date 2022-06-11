import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import auth from "./auth";
import users from "./users";
import friendRequests from "./friendRequests";
import challenges from "./challenges";
import challengeLines from "./challengeLines";

const reducer = combineReducers({
  auth,
  users,
  friendRequests,
  challenges,
  challengeLines,
});
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(reducer, middleware);

export default store;
export * from "./auth";
export * from "./users";
export * from "./friendRequests";
export * from "./challenges";
export * from "./challengeLines";
