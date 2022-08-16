import { GLOBALTYPES } from "redux/types/globalTypes";
import axios from "services/auth/api/axios.js";

export const login = (data) => async (dispatch) => {
  const username = data.username;
  const password = data.password;
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await axios.post("/login", { username, password });

    console.log(res.data.access_token)
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: res.data.access_token,
        user: res.data.user,
      },
    });

    localStorage.setItem("login", true);
    localStorage.setItem("tkn_fisco", res.data.access_token);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: "Success!",
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err,
      },
    });
  }
};

export const register = (data) => async (dispatch) => {
  // const username = data.username;
  // const password = data.password;
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await axios.post("/auth/registration", data);

    //console.log(res.data.access_token)
    // dispatch({
    //   type: GLOBALTYPES.AUTH,
    //   payload: {
    //     token: res.data.access_token,
    //     user: res.data.user,
    //   },
    // });

    // localStorage.setItem("login", true);
    // localStorage.setItem("tkn_fisco", res.data.access_token);
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        success: "Registration successful!",
      },
    });
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err,
      },
    });
  }
};

export const refreshToken = () => async (dispatch) => {
  const firstLogin = localStorage.getItem("login");
  const token = localStorage.getItem("tkn_fisco");

  const config = {
    headers: { Authorization: `Bearer ${token}` },
  };

  if (firstLogin) {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    try {
      const res = await axios.get("/auth/token/refresh", config);
      console.log("Refresh token!");
      
      dispatch({
        type: GLOBALTYPES.AUTH,
        payload: {
          token: res.data.access_token,
          user: res.data.user,
        },
      });
      dispatch({ type: GLOBALTYPES.ALERT, payload: {} });
    } catch (err) {
      dispatch({
        type: GLOBALTYPES.ALERT,
        payload: {
          error: err.response.data.msg,
        },
      });
    }
  }
};

export const logout = () => async (dispatch) => {
  try {
    localStorage.removeItem("login");
    localStorage.removeItem("tkn_fisco");

    window.location.href = "/login";
  } catch (err) {
    dispatch({
      type: GLOBALTYPES.ALERT,
      payload: {
        error: err.response.data.msg,
      },
    });
  }
};
