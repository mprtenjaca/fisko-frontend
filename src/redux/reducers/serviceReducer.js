import { SERVICE_TYPES } from "redux/actions/serviceAction";
import { DeleteData } from "redux/types/globalTypes";
import { EditData } from "redux/types/globalTypes";

const initialState = {
  loading: false,
  services: [],
};

const childReducer = (state = initialState, action) => {
  switch (action.type) {
    case SERVICE_TYPES.GET_SERVICES:
      return {
        ...state,
        services: action.payload,
      };
    case SERVICE_TYPES.CREATE_SERVICE:
      return {
        ...state,
        services: [...state.services, action.payload],
      };
    case SERVICE_TYPES.UPDATE_SERVICE:
      return {
        ...state,
        services: EditData(state.services, action.payload),
      };
    case SERVICE_TYPES.DELETE_SERVICE:
      return {
        ...state,
        services: DeleteData(state.services, action.payload),
      };
    case SERVICE_TYPES.LOADING_SERVICES:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default childReducer;
