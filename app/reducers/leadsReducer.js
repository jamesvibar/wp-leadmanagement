import {
  GET_LEADS,
  GET_LEAD,
  UPDATE_LEAD,
  LEADS_LOADING,
  CREATE_LEAD,
  DELETE_LEAD,
  FILTER_LEADS
} from "../actions/types";

const initialState = {
  leads: [],
  filteredLeads: [],
  lead: [],
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case LEADS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_LEADS:
      return {
        ...state,
        // leads: action.payload,
        leads: action.payload.filter(lead => lead.is_deleted == 0),
        loading: false
      };
    case GET_LEAD:
      return {
        ...state,
        lead: action.payload,
        loading: false
      };
    case DELETE_LEAD:
      return {
        ...state,
        leads: state.leads.filter(lead => lead.id !== action.payload.id)
      };
    case CREATE_LEAD:
      return {
        ...state,
        leads: [action.payload, ...state.leads]
      };
    case UPDATE_LEAD:
      return {
        ...state,
        leads: state.leads.map(lead =>
          lead.id === action.payload.id ? (lead = action.payload) : lead
        ),
        loading: false
      };
    case FILTER_LEADS:
      return {
        ...state,
        filteredLeads: state.leads.filter(({ date_send }) => {
          const the_date = new Date(date_send);
          return (
            the_date.getTime() < action.payload.endDate &&
            the_date.getTime() > action.payload.startDate
          );
        })
      };

    default:
      return state;
  }
}
