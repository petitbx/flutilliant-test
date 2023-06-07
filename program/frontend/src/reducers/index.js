import { combineReducers } from "redux";
import auth from "./auth";
import address from "./address";
import contact from "./contact";
export default combineReducers({
  auth,
  address,
  contact
});
