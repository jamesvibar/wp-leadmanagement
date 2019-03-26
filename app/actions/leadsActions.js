import { GET_LEADS, GET_LEAD, LEADS_LOADING, UPDATE_LEAD } from "./types";
import axios from "axios";
import { wordpress } from "../config/wordpress";

export const getLeads = table_name => dispatch => {
  dispatch(setLeadsLoading());
  axios.get(`${wordpress.api_url}/leads/${table_name}`).then(res => {
    dispatch({
      type: GET_LEADS,
      payload: res.data
    });
  });
};

export const getLead = id => dispatch => {
  dispatch(setLeadsLoading());
  axios.get(`${wordpress.api_url}/leads/${id}`).then(res => {
    dispatch({
      type: GET_LEAD,
      payload: res.data
    });
  });
};

export const updateLead = (updatedLead, toast) => dispatch => {
  axios
    .post(`${wordpress.api_url}/leads/${updatedLead.id}`, updatedLead)
    .then(res => {
      dispatch({
        type: UPDATE_LEAD,
        payload: res.data
      });
      if (res.status === 200) {
        toast.success("Lead has been saved successfully");
      }
    })
    .catch(err => {
      toast.error("Error: Unable to save lead");
    });
};

export const setLeadsLoading = () => {
  return {
    type: LEADS_LOADING
  };
};
