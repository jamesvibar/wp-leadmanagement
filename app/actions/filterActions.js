import { FILTER_LEADS } from "./types";

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
