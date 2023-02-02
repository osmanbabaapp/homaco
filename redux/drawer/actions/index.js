//constants
import * as constants from "../constants";
export const openDrawer =
  (drawerType = 0, successAction, dPayloads, editMode = false) =>
  (dispatch) => {
    dispatch({
      type: constants.OPEN_DRAWER,
      payload: {
        drawerType: drawerType,
        successAction: successAction,
        dPayloads: dPayloads,
      },
    });
  };

export const closeDrawer =
  (drawerType = 0) =>
  (dispatch) => {
    dispatch({ type: constants.CLOSE_DRAWER, payload: drawerType });
  };
