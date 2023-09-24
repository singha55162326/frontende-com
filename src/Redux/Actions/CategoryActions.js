import { 
    CATEGORY_LIST_FAIL, 
    CATEGORY_LIST_REQUEST, 
    CATEGORY_LIST_SUCCESS 
} from "../Constants/CategoryContants";

import axios from "axios"

// ALL CATEGORY 
export const listCategories = () => async (dispatch) => {
    try {
      dispatch({ type: CATEGORY_LIST_REQUEST });
  
      const { data } = await axios.get(`/api/category`);
  
      dispatch({ type: CATEGORY_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
          type: CATEGORY_LIST_FAIL,
          payload:
            error.response && error.response.data.message
              ? error.response.data.message
              : error.message,
        });
      }
    };