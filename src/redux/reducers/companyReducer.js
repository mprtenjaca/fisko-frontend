import { COMPANY_TYPES } from "redux/actions/companyAction";
import { EditOneData } from "redux/types/globalTypes";
import { DeleteData } from "redux/types/globalTypes";
import { EditData } from "redux/types/globalTypes";

const initialState = {
  loading: false,
  company: {},
};

const companyReducer = (state = initialState, action) => {
  switch (action.type) {
    case COMPANY_TYPES.GET_COMPANY:
      return {
        ...state,
        company: action.payload,
      };
    case COMPANY_TYPES.CREATE_COMPANY:
      return {
        ...state,
        company: action.payload,
      };
    case COMPANY_TYPES.UPDATE_COMPANY:
      return {
        ...state,
        company: action.payload,
      };
    case COMPANY_TYPES.DELETE_COMPANY:
      return {
        ...state,
        company: DeleteData(state.company, action.payload),
      };
    case COMPANY_TYPES.LOADING_COMPANY:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default companyReducer;
