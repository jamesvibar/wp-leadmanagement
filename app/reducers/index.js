import { combineReducers } from "redux";
import leadsReducer from "./leadsReducer";

export default combineReducers({
  leads: leadsReducer
})