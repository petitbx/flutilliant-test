import { combineReducers } from "redux";
import auth from "./auth";
import address from "./address";
import contact from "./contact";
import visit from "./visit";
export default combineReducers({
  auth,
  address,
  contact,
  visit
});
