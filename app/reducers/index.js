import { combineReducers } from "redux";
import leadsReducer from "./leadsReducer";
import settingsReducer from "./settingsReducer";

export default combineReducers({
  leads: leadsReducer,
  settings: settingsReducer
});
