import { FILTER_LEADS, RESET_FILTER } from "./types";

export const filterLeads = (startDate, endDate) => dispatch => {
  startDate = startDate.getTime();
  endDate = endDate.getTime();
  dispatch({
    type: FILTER_LEADS,
    payload: {
      startDate,
      endDate
    }
  });
};

export const resetFilter = () => dispatch => {
  dispatch({
    type: RESET_FILTER
  });
};
