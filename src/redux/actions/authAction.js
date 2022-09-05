import { GLOBALTYPES } from "redux/types/globalTypes";
import axios from "services/auth/api/axios.js";
import notify from "variables/notify";

export const login =
  (data, { success }, { setSuccess }, { notificationAlert }) =>
  async (dispatch) => {
    const username = data.username;
    const password = data.password;
    console.log(notificationAlert);
    console.log(success);
    try {
      dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
      const res = await axios.post("/login", { username, password });

      if (res.data.access_token) {
        dispatch({
          type: GLOBALTYPES.AUTH,
          payload: {
            token: res.data.access_token,
            user: res.data.user,
          },
        });

        localStorage.setItem("login", true);
        localStorage.setItem("tkn_fisco", res.data.access_token);
        setSuccess(true);

        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            success: "Success!",
          },
        });
      }else{
        notify("br", "danger", notificationAlert, "Login Failed: Incorrect email or password");
      }
      {
        dispatch({
          type: GLOBALTYPES.ALERT,
          payload: {
            error: "Login failed!",
          },
        });
      }
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
  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });
    const res = await axios.post("/auth/registration", data);

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
