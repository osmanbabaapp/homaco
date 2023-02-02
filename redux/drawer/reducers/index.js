//constantsss
import * as constants from "../constants";
const INITIAL_STATE = {
  drawerType: 0,
  visible: false,
  successAction: null,
  dPayloads: null,
  editMode: false,
};

export const drawerReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case constants.OPEN_DRAWER:
      return {
        ...state,
        visible: true,
        drawerType: action.payload.drawerType,
        successAction: action.payload.successAction,
        dPayloads: action.payload.dPayloads,
      };
    case constants.CLOSE_DRAWER:
      return {
        ...state,
        visible: false,
        drawerType: 0,
        successAction: null,
        dPayloads: null,
        editMode: false,
      };
    // case constants.CLOSE_TARGET_MODAL:
    //   let newArr = state.drawerType.splice(
    //     state.drawerType.indexOf(action.payload),
    //     1
    //   );
    //   return {
    //     ...state,
    //     visible: true,
    //     drawerType: [
    //       ...state.drawerType.splice(
    //         state.drawerType.indexOf(action.payload),
    //         1
    //       ),
    //     ],
    //   };
    default:
      return state;
  }
};
