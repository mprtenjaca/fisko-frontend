import { GLOBALTYPES } from "../types/globalTypes.js";

const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.AUTH:
      return action.payload;
    case GLOBALTYPES.COMPANY:
      return action.payload;
    default:
      return state;
  }
};

export default authReducer;
