import { GLOBALTYPES } from "redux/types/globalTypes";
import axios from "services/auth/api/axios.js";

export const OFFER_TYPES = {
  CREATE_OFFER: "CREATE_OFFER",
  UPDATE_OFFER: "UPDATE_OFFER",
  GET_OFFER: "GET_OFFER",
  LOADING_OFFERS: "LOADING_OFFERS",
  DELETE_OFFER: "DELETE_OFFER",
};

export const getOffers = (auth) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };

  try {
    dispatch({ type: OFFER_TYPES.LOADING_OFFERS, payload: true });

    const res = await axios.get("/api/offer/admin/" + auth.user.id, config);
    console.log(res.data)

    dispatch({
      type: OFFER_TYPES.GET_OFFER,
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

export const updateOffer = (data, auth) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await axios.put("/api/offer/" + data.id, data, config);

    dispatch({
      type: OFFER_TYPES.UPDATE_OFFER,
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

export const createOffer = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await axios.post("/api/offer", data, config);

    dispatch({
      type: OFFER_TYPES.CREATE_OFFER,
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

export const deleteOffer = (data) => async (dispatch) => {
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  try {
    dispatch({ type: OFFER_TYPES.LOADING_OFFERS, payload: true });

    const res = await axios.delete("/api/offer/" + data.id, config);

    dispatch({
      type: OFFER_TYPES.DELETE_OFFER,
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