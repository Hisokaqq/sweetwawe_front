import axios from "axios"
import {
    SONG_LIST_REQUEST,
    SONG_LIST_SUCCESS,
    SONG_LIST_FAIL,

    SONG_DETAILS_REQUEST,
    SONG_DETAILS_SUCCESS,
    SONG_DETAILS_FAIL,

    SONG_CREATE_REVIEW_REQUEST,
    SONG_CREATE_REVIEW_SUCCESS,
    SONG_CREATE_REVIEW_FAIL,

    SONG_ADD_LIKE_REQUEST,
    SONG_ADD_LIKE_SUCCESS,
    SONG_ADD_LIKE_FAIL,
    SONG_ADD_LIKE_RESET,
} from "../constants/songConstants"

export const listSongs = () => async (dispatch) => {
    try {

        dispatch({
            type: SONG_LIST_REQUEST
        })

        const {
            data
        } = await axios.get(`/api/songs/`)
        dispatch({
            type: SONG_LIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SONG_LIST_FAIL,
            payload: error.responce && error.responce.data.detail ? error.responce.data.detail : error.message
        })
    }
}
export const listSongDetails = (id) => async (dispatch) => {
    try {

        dispatch({
            type: SONG_DETAILS_REQUEST
        })

        const {
            data
        } = await axios.get(`/api/songs/${id}`)
        dispatch({
            type: SONG_DETAILS_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SONG_DETAILS_FAIL,
            payload: error.responce && error.responce.data.detail ? error.responce.data.detail : error.message
        })
    }
}

export const createSongReview = (songId, review) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SONG_CREATE_REVIEW_REQUEST
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
        const {
            data
        } = await axios.post(
            `/api/songs/${songId}/reviews/`,
            review,
            config
        )

        dispatch({
            type: SONG_CREATE_REVIEW_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: SONG_CREATE_REVIEW_FAIL,
            payload: error.response && error.response.data.details ?
                error.response.data.details : error.message,
        })
    }
}

export const addLike = (songId) => async (dispatch, getState) => {
    try {
        dispatch({
            type: SONG_ADD_LIKE_REQUEST
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
        const {
            data
        } = await axios.post(
            `/api/users/${songId}/likes/`, {},
            config
        )
        dispatch({
            type: SONG_ADD_LIKE_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SONG_ADD_LIKE_FAIL,
            payload: error.response && error.response.data.details ?
                error.response.data.details : error.message,
        })
    }
}