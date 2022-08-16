import { OFFER_TYPES } from "redux/actions/offerAction";
import { DeleteData } from "redux/types/globalTypes";
import { EditData } from "redux/types/globalTypes";

const initialState = {
  loading: false,
  offers: [],
};

const offerReduceer = (state = initialState, action) => {
  switch (action.type) {
    case OFFER_TYPES.GET_OFFER:
      return {
        ...state,
        offers: action.payload,
      };
    case OFFER_TYPES.CREATE_OFFER:
      return {
        ...state,
        offers: [...state.offers, action.payload],
      };
    case OFFER_TYPES.UPDATE_OFFER:
      return {
        ...state,
        offers: EditData(state.offers, action.payload),
      };
    case OFFER_TYPES.DELETE_OFFER:
      return {
        ...state,
        offers: DeleteData(state.offers, action.payload),
      };
    case OFFER_TYPES.LOADING_OFFERS:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return state;
  }
};

export default offerReduceer;
