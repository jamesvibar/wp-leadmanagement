import React from "react";
import ReactDOM from "react-dom";
import Admin from "./containers/Admin.jsx";
import { Provider } from "react-redux";
import store from "./store";

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    <Provider store={store}>
      <Admin />
    </Provider>,
    document.getElementById("wp-reactivate-admin")
  );
});
