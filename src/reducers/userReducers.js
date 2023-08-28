import {
    USER_LOGIN_REQUEST,
    USER_LOGIN_SUCCESS,
    USER_LOGIN_FAIL,

    USER_LOGOUT,

    USER_REGISTER_REQUEST,
    USER_REGISTER_SUCCESS,
    USER_REGISTER_FAIL,

    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_DETAILS_RESET,

    USER_PROFILE_UPDATE_REQUEST,
    USER_PROFILE_UPDATE_SUCCESS,
    USER_PROFILE_UPDATE_FAIL,
    USER_PROFILE_UPDATE_RESET,

    USER_UPLOAD_AVATAR_REQUEST,
    USER_UPLOAD_AVATAR_SUCCESS,
    USER_UPLOAD_AVATAR_FAIL,


} from "../constants/userConstants";

export const userLoginReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGIN_REQUEST:
            return {
                loading: true
            }
            case USER_LOGIN_SUCCESS:
                return {
                    loading: false, userInfo: action.payload
                }
                case USER_LOGIN_FAIL:
                    return {
                        loading: false, error: action.payload
                    }
                    case USER_LOGOUT:
                        return {}
                        default:
                            return state

    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_REGISTER_REQUEST:
            return {
                loadingR: true
            }
            case USER_REGISTER_SUCCESS:
                return {
                    loadingR: false, userInfoR: action.payload
                }
                case USER_REGISTER_FAIL:
                    return {
                        loadingR: false, errorR: action.payload
                    }
                    default:
                        return state

    }
}

export const userDetailsReducer = (state = {
    user: {}
}, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return {
                ...state, loading: true
            }

            case USER_DETAILS_SUCCESS:
                return {
                    loading: false, user: action.payload
                }

                case USER_DETAILS_FAIL:
                    return {
                        loading: false, error: action.payload
                    }

                    case USER_DETAILS_RESET:
                        return {
                            user: {}
                        }
                        default:
                            return state
    }
}

export const userUpdateProfileReducer = (state = {

}, action) => {
    switch (action.type) {
        case USER_PROFILE_UPDATE_REQUEST:
            return {
                loading: true
            }

            case USER_PROFILE_UPDATE_SUCCESS:
                return {
                    loading: false, success: true, userInfo: action.payload
                }
                case USER_PROFILE_UPDATE_RESET:
                    return {}

                    case USER_PROFILE_UPDATE_FAIL:
                        return {
                            loading: false, error: action.payload
                        }




                        default:
                            return state
    }
}

export const uploadAvatarReducer = (state = {

}, action) => {
    switch (action.type) {
        case USER_UPLOAD_AVATAR_REQUEST:
            return {
                loading: true,
            }
            case USER_UPLOAD_AVATAR_SUCCESS:
                return {
                    loading: false, success: true,
                }
                case USER_UPLOAD_AVATAR_FAIL:
                    return {
                        loading: false, error: action.payload
                    }
                    default:
                        return state

    }
}