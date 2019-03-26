import { GET_TABLES } from "./types";
import axios from "axios";
import { wordpress } from "../config/wordpress";

export const getTables = () => dispatch => {
  axios.get(`${wordpress.api_url}/admin`).then(res => {
    dispatch({
      type: GET_TABLES,
      payload: res.data
    });
  });
};
