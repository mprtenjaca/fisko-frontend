import { GLOBALTYPES } from "redux/types/globalTypes";
import axios from "services/auth/api/axios.js";

export const CUSTOMER_TYPES = {
  CREATE_CUSTOMER: "CREATE_CUSTOMER",
  UPDATE_CUSTOMER: "UPDATE_CUSTOMER",
  GET_CUSTOMERS: "GET_CUSTOMERS",
  DELETE_CUSTOMER: "DELETE_CUSTOMER",
  LOADING_CUSTOMERS: "LOADING_CUSTOMERS",
};

export const getCustomers = (auth) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };

  try {
    dispatch({ type: CUSTOMER_TYPES.LOADING_CUSTOMERS, payload: true });
    const res = await axios.get("/api/customer/admin/" + auth.user.id, config);

    dispatch({
      type: CUSTOMER_TYPES.GET_CUSTOMERS,
      payload: res.data,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: res.data.msg,
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

export const updateCustomer = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await axios.put("/api/customer/" + data.id, data, config);

    dispatch({
      type: CUSTOMER_TYPES.UPDATE_CUSTOMER,
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

export const createCustomer = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await axios.post("/api/customer", data, config);

    dispatch({
      type: CUSTOMER_TYPES.CREATE_CUSTOMER,
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

export const deleteCustomer = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: CUSTOMER_TYPES.LOADING_CUSTOMERS, payload: true });

    const res = await axios.delete("/api/customer/" + data.id, config);

    dispatch({
      type: CUSTOMER_TYPES.DELETE_CUSTOMER,
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
