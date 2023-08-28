import axios from "axios";
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

export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_LOGIN_REQUEST
        })

        const config = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const {
            data
        } = await axios.post(
            "/api/users/login/", {
                "username": email,
                "password": password
            },
            config
        )

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}

export const logout = () => (dispatch) => {
    localStorage.removeItem("userInfo")
    dispatch({
        type: USER_LOGOUT
    })
    dispatch({
        type: USER_DETAILS_RESET
    })
}


export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_DETAILS_REQUEST
        })

        const {
            userLogin: {
                userInfo
            },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {
            data
        } = await axios.get(
            `/api/users/profile/`,
            config
        )
        dispatch({
            type: USER_DETAILS_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: USER_DETAILS_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({
            type: USER_REGISTER_REQUEST
        })

        const consfig = {
            headers: {
                "Content-type": "application/json"
            }
        }

        const {
            data
        } = await axios.post(
            "/api/users/register/", {
                "name": name,
                "email": email,
                "password": password
            },
            consfig
        )

        dispatch({
            type: USER_REGISTER_SUCCESS,
            payload: data
        })
        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))

    } catch (error) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}

export const updateUserProfile = (user) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_PROFILE_UPDATE_REQUEST
        })

        const {
            userLogin: {
                userInfo
            },
        } = getState()
        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const {
            data
        } = await axios.put(
            `/api/users/profile/update/`,
            user,
            config
        )
        dispatch({
            type: USER_PROFILE_UPDATE_SUCCESS,
            payload: data
        })

        dispatch({
            type: USER_LOGIN_SUCCESS,
            payload: data
        })

        localStorage.setItem("userInfo", JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: USER_PROFILE_UPDATE_FAIL,
            payload: error.response && error.response.data.detail ?
                error.response.data.detail : error.message,
        })
    }
}

export const uploadNewAvatar = (picture) => async (dispatch, getState) => {
    try {
        dispatch({
            type: USER_UPLOAD_AVATAR_REQUEST
        })

        const {
            userLogin: {
                userInfo
            }
        } = getState()

        const config = {
            headers: {
                'Content-type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        console.log(211)
        const {
            data
        } = await axios.put(
            `/api/users/profile/avatar`,
            picture,
            config
        )
        console.log(1111)

        dispatch({
            type: USER_UPLOAD_AVATAR_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: USER_UPLOAD_AVATAR_FAIL,
            payload: error.response && error.response.data.details ?
                error.response.data.details : error.message,
        })
    }
}