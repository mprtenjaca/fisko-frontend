import { OUTPUT_INVOICE_TYPES } from "redux/actions/outputInvoiceAction";
import { DeleteData } from "redux/types/globalTypes";
import { EditData } from "redux/types/globalTypes";

const initialState = {
  loading: false,
  outputInvoices: [],
};

const outputInvoiceReducer = (state = initialState, action) => {
  switch (action.type) {
    case OUTPUT_INVOICE_TYPES.GET_OUTPUT_INVOICE:
      return {
        ...state,
        outputInvoices: action.payload,
      };
    case OUTPUT_INVOICE_TYPES.CREATE_OUTPUT_INVOICE:
      return {
        ...state,
        outputInvoices: [...state.outputInvoices, action.payload],
      };
    case OUTPUT_INVOICE_TYPES.UPDATE_OUTPUT_INVOICE:
      return {
        ...state,
        outputInvoices: EditData(state.outputInvoices, action.payload),
      };
    case OUTPUT_INVOICE_TYPES.DELETE_OUTPUT_INVOICE:
      return {
        ...state,
        outputInvoices: DeleteData(state.outputInvoices, action.payload),
      };
    case OUTPUT_INVOICE_TYPES.LOADING_OUTPUT_INVOICES:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default outputInvoiceReducer;
