import { combineReducers } from "redux";
import auth from "./auth";
import address from "./address";

export default combineReducers({
  auth,
  address
});
