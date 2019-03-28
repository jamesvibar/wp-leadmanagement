import {
  GET_LEADS,
  GET_LEAD,
  LEADS_LOADING,
  UPDATE_LEAD,
  CREATE_LEAD,
  DELETE_LEAD
} from "./types";
import axios from "axios";
import { wordpress } from "../config/wordpress";

export const getLeads = () => dispatch => {
  dispatch(setLeadsLoading());
  axios.get(`${wordpress.api_url}/leads`).then(res => {
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
      toast.error(err.response.data.message);
    });
};

/**
 * This function does not actually delete the lead but updates the is_deleted boolean in the database.
 * Updating is_deleted prevents it from appearing in the front end. Making it seem to be deleted when it's
 * actually not.
 *
 * @param id = the lead to delete
 */
export const deleteLead = (id, toast) => dispatch => {
  axios
    .delete(`${wordpress.api_url}/leads/${id}`)
    .then(res => {
      dispatch({
        type: DELETE_LEAD,
        payload: res.data
      });
      if (res.status === 200) {
        toast.warning("Lead has been deleted");
      }
    })
    .catch(err => {
      toast.error(err.response.data.message);
    });
};

export const createLead = (newLead, toast, close) => dispatch => {
  axios
    .post(`${wordpress.api_url}/leads`, newLead)
    .then(res => {
      dispatch({
        type: CREATE_LEAD,
        payload: res.data
      });
      if (res.status === 200) {
        toast.success("New lead has been created");
        close();
      }
    })
    .catch(err => {
      toast.error(err.response.data.message);
    });
};

export const setLeadsLoading = () => {
  return {
    type: LEADS_LOADING
  };
};
