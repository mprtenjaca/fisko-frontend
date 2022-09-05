import { GLOBALTYPES } from "redux/types/globalTypes";
import axios from "services/auth/api/axios.js";

export const updateUser = (data, auth) => async (dispatch) => {
  const config = {
    headers: { Authorization: `Bearer ${auth.token}` },
  };

  try {
    dispatch({ type: GLOBALTYPES.ALERT, payload: { loading: true } });

    const res = await axios.put("/api/user/" + data.id, data, config);
    
    dispatch({
      type: GLOBALTYPES.AUTH,
      payload: {
        token: auth.token,
        user: res.data
      },
    });

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
