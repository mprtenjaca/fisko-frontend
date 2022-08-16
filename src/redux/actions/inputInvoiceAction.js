import { GLOBALTYPES } from "redux/types/globalTypes";
import axios from "services/auth/api/axios.js";

export const INPUT_INVOICE_TYPES = {
  CREATE_INPUT_INVOICE: "CREATE_INPUT_INVOICE",
  UPDATE_INPUT_INVOICE: "UPDATE_INPUT_INVOICE",
  GET_INPUT_INVOICES: "GET_INPUT_INVOICES",
  LOADING_INPUT_INVOICES: "LOADING_INPUT_INVOICES",
  DELETE_INPUT_INVOICE: "DELETE_INPUT_INVOICE",
};

export const getInputInvoices = (auth) => async (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };

  try {
    dispatch({ type: INPUT_INVOICE_TYPES.LOADING_INPUT_INVOICES, payload: true });

    const res = await axios.get("/api/input-invoice/admin/" + auth.user.id, config);

    dispatch({
      type: INPUT_INVOICE_TYPES.GET_INPUT_INVOICES,
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

export const updateInputInvoice = (data, auth) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await axios.put("/api/input-invoice/" + data.id, data, config);

    dispatch({
      type: INPUT_INVOICE_TYPES.UPDATE_INPUT_INVOICE,
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

export const createInputInvoice = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await axios.post("/api/input-invoice", data, config);

    dispatch({
      type: INPUT_INVOICE_TYPES.CREATE_INPUT_INVOICE,
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

export const deleteInputInvoice = (data, auth) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };

  try {
    dispatch({ type: INPUT_INVOICE_TYPES.LOADING_INPUT_INVOICES, payload: true });

    await axios.delete("/api/input-invoice/" + data.id, config);

    dispatch({
      type: INPUT_INVOICE_TYPES.DELETE_INPUT_INVOICE,
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