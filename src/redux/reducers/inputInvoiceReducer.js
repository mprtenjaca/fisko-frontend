import { INPUT_INVOICE_TYPES } from "redux/actions/inputInvoiceAction";
import { DeleteData } from "redux/types/globalTypes";
import { EditData } from "redux/types/globalTypes";

const initialState = {
  loading: false,
  inputInvoices: [],
};

const inputInvoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case INPUT_INVOICE_TYPES.GET_INPUT_INVOICES:
      return {
        ...state,
        inputInvoices: action.payload,
      };
    case INPUT_INVOICE_TYPES.CREATE_INPUT_INVOICE:
      return {
        ...state,
        inputInvoices: [...state.inputInvoices, action.payload],
      };
    case INPUT_INVOICE_TYPES.UPDATE_INPUT_INVOICE:
      return {
        ...state,
        inputInvoices: EditData(state.inputInvoices, action.payload),
      };
    case INPUT_INVOICE_TYPES.DELETE_INPUT_INVOICE:
      return {
        ...state,
        inputInvoices: DeleteData(state.inputInvoices, action.payload),
      };
    case INPUT_INVOICE_TYPES.LOADING_INPUT_INVOICES:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default inputInvoiceReducer;
