import { actionType } from "./ActionTypes"

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case actionType.SIGN_IN_SUCCEEDED:
            return {
                ...state,
                userInfo: action.payload,
                token: action.payload.token,
                isAuth: true,

            }

        case actionType.SIGN_IN_FAILED:
            return {
                ...state,
                isAuth: false,
                user: {}
            }

        case actionType.SIGNUP_SUCCEEDED:
            return {
                ...state,
                isAuth: true,
                user: {
                    username: action.payload.username,
                    user_id: action.payload.user_id,
                    role: action.payload.role,
                    token: action.payload.token,
                    capabilities: action.payload.capabilities,
                }
            }

        case actionType.SIGNUP_FAILED:
            return {
                ...state,
                isAuth: false,
                error: action.payload,
                user: {}
            };

    }

}