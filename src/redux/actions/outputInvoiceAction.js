import { GLOBALTYPES } from "redux/types/globalTypes";
import axios from "services/auth/api/axios.js";

export const OUTPUT_INVOICE_TYPES = {
  CREATE_OUTPUT_INVOICE: "CREATE_OUTPUT_INVOICE",
  UPDATE_OUTPUT_INVOICE: "UPDATE_OUTPUT_INVOICE",
  GET_OUTPUT_INVOICE: "GET_OUTPUT_INVOICE",
  LOADING_OUTPUT_INVOICES: "LOADING_OUTPUT_INVOICES",
  DELETE_OUTPUT_INVOICE: "DELETE_OUTPUT_INVOICE",
};

export const getOutputInvoices = (auth) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };

  try {
    dispatch({ type: OUTPUT_INVOICE_TYPES.LOADING_OUTPUT_INVOICES, payload: true });

    const res = await axios.get("/api/output-invoice/admin/" + auth.user.id, config);
    console.log(res.data)

    dispatch({
      type: OUTPUT_INVOICE_TYPES.GET_OUTPUT_INVOICE,
      payload: res.data,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: true,
      },
    });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err,
      },
    });
  }
};

export const updateOutputInvoice = (data, auth) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await axios.put("/api/output-invoice/" + data.id, data, config);

    dispatch({
      type: OUTPUT_INVOICE_TYPES.UPDATE_OUTPUT_INVOICE,
      payload: res.data,
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err },
    });
  }
};

export const createOutputInvoice = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await axios.post("/api/output-invoice", data, config);

    dispatch({
      type: OUTPUT_INVOICE_TYPES.CREATE_OUTPUT_INVOICE,
      payload: res.data,
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: res.data.msg } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err },
    });
  }
};

export const deleteOutputInvoice = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: OUTPUT_INVOICE_TYPES.LOADING_OUTPUT_INVOICES, payload: true });

    const res = await axios.delete("/api/output-invoice/" + data.id, config);

    dispatch({
      type: OUTPUT_INVOICE_TYPES.DELETE_OUTPUT_INVOICE,
      payload: data.id,
    });

    dispatch({ type: GLOBALTYPES.ALERT, payload: { success: "Success" } });
  } catch (err) {
    console.log(err);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: { error: err },
    });
  }
};