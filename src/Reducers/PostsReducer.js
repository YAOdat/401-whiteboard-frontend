import { actionType } from "./ActionTypes"

export const PostReducer = (state, action) => {
    switch (action.type) {
      case actionType.GET_POSTS:
        return {
          ...state,
          post: action.payload,
        };
      default:
        return state;
    }
  }