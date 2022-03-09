import { OPEN_MODEL } from "./store";

const initialState = {
    openModel : false
  };
  const MemberReducer = (state=initialState, action) => {
    switch(action.type) {
      case OPEN_MODEL:
        console.log("called")
        return {
          ...state,
          openModel: action.data
        };
      default:
        return state;
    }
  };
  export default MemberReducer;