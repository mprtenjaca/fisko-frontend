import { GLOBALTYPES } from "redux/types/globalTypes";
import axios from "services/auth/api/axios.js";

export const SERVICE_TYPES = {
  CREATE_SERVICE: "CREATE_SERVICE",
  UPDATE_SERVICE: "UPDATE_SERVICE",
  GET_SERVICES: "GET_SERVICES",
  DELETE_SERVICE: "DELETE_SERVICE",
  LOADING_SERVICES: "LOADING_SERVICES",
};

export const getServices = (auth) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };

  try {
    dispatch({ type: SERVICE_TYPES.LOADING_SERVICES, payload: true });
    const res = await axios.get("/api/service/admin/" + auth.user.id, config);

    dispatch({
      type: SERVICE_TYPES.GET_SERVICES,
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

export const updateService = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await axios.put("/api/service/" + data.id, data, config);

    dispatch({
      type: SERVICE_TYPES.UPDATE_SERVICE,
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

export const createService = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await axios.post("/api/service", data, config);

    dispatch({
      type: SERVICE_TYPES.CREATE_SERVICE,
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

export const deleteService = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: SERVICE_TYPES.LOADING_SERVICES, payload: true });

    const res = await axios.delete("/api/service/" + data.id, config);

    dispatch({
      type: SERVICE_TYPES.DELETE_SERVICE,
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