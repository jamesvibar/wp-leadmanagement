import React from "react";
import ReactDOM from "react-dom";
import Leads from "./containers/Leads.jsx";
import { Provider } from "react-redux";
import store from "./store";
import { ToastContainer } from "react-toastify";

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    <Provider store={store}>
      <Leads />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnVisibilityChange
        draggable
        pauseOnHover
      />
    </Provider>,
    document.getElementById("wp-reactivate-leads")
  );
});
