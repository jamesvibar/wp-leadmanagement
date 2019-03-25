import {
  GET_LEADS,
  GET_LEAD,
  UPDATE_LEAD,
  LEADS_LOADING
} from "../actions/types";

const initialState = {
  leads: [],
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
        leads: action.payload,
        loading: false
      };
    case GET_LEAD:
      return {
        ...state,
        lead: action.payload,
        loading: false
      };
    case UPDATE_LEAD:
      return {
        ...state,
        leads: state.leads.map(lead =>
          lead.id === action.payload.id ? (lead = action.payload) : lead
        ),
        loading: false
      };

    default:
      return state;
  }
}
