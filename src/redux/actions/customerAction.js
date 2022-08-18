import { GLOBALTYPES } from "redux/types/globalTypes";
import axios from "services/auth/api/axios.js";

export const COMPANY_TYPES = {
  CREATE_COMPANY: "CREATE_COMPANY",
  UPDATE_COMPANY: "UPDATE_COMPANY",
  GET_COMPANY: "GET_COMPANY",
  DELETE_COMPANY: "DELETE_COMPANY",
  LOADING_COMPANY: "LOADING_COMPANY",
};

export const getCompany = (auth) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: true });
    const res = await axios.get("/api/company/admin/" + auth.user.id, config);

    dispatch({
      type: COMPANY_TYPES.GET_COMPANY,
      payload: res.data,
    });

    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: "Success!",
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

export const createCompany = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: COMPANY_TYPES.LOADING_COMPANY, payload: { loading: true } });

    const res = await axios.post("/api/company", data, config);

    console.log(res.data)

    dispatch({
      type: COMPANY_TYPES.CREATE_COMPANY,
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

export const updateCompany = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: COMPANY_TYPES.LOADING_COMPANY, payload: { loading: true } });

    const res = await axios.put("/api/company/" + data.id, data, config);
    
    dispatch({
      type: COMPANY_TYPES.UPDATE_COMPANY,
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
