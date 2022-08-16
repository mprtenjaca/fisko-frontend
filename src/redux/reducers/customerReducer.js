import { CUSTOMER_TYPES } from "redux/actions/customerAction";
import { DeleteData } from "redux/types/globalTypes";
import { EditData } from "redux/types/globalTypes";

const initialState = {
  loading: false,
  customers: [],
};

const customerReducer = (state = initialState, action) => {
  switch (action.type) {
    case CUSTOMER_TYPES.GET_CUSTOMERS:
      return {
        ...state,
        customers: action.payload,
      };
    case CUSTOMER_TYPES.CREATE_CUSTOMER:
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };
    case CUSTOMER_TYPES.UPDATE_CUSTOMER:
      return {
        ...state,
        customers: EditData(state.customers, action.payload),
      };
    case CUSTOMER_TYPES.DELETE_CUSTOMER:
      return {
        ...state,
        customers: DeleteData(state.customers, action.payload),
      };
    case CUSTOMER_TYPES.LOADING_CUSTOMERS:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default customerReducer;
