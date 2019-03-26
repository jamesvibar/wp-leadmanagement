import { GET_TABLES } from "../actions/types";

const initialState = {
  tables: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_TABLES:
      return {
        ...state,
        tables: action.payload
      };

    default:
      return state;
  }
}
