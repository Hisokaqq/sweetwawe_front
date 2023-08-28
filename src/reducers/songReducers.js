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
    SONG_CREATE_REVIEW_RESET,

    SONG_ADD_LIKE_REQUEST,
    SONG_ADD_LIKE_SUCCESS,
    SONG_ADD_LIKE_FAIL,
    SONG_ADD_LIKE_RESET,

} from "../constants/songConstants"

export const songListReducer = (state = {
    songs: [{
        _id: 3
    }]
}, action) => {
    switch (action.type) {
        case SONG_LIST_REQUEST:
            return {
                loading: true, songs: []
            }
            case SONG_LIST_SUCCESS:
                return {
                    loading: false, songs: action.payload
                }
                case SONG_LIST_FAIL:
                    return {
                        loading: false, error: action.payload
                    }
                    default:
                        return state

    }
}

export const songDetailsReducer = (state = {
    currentSong: {
        _id: 3,
        reviews: []
    }
}, action) => {
    switch (action.type) {
        case SONG_DETAILS_REQUEST:
            return {
                loading: true, ...state
            }
            case SONG_DETAILS_SUCCESS:
                return {
                    loading: false, currentSong: action.payload
                }
                case SONG_DETAILS_FAIL:
                    return {
                        loading: false, error: action.payload
                    }
                    default:
                        return state

    }
}

export const songReviewCreateReducer = (state = {

}, action) => {
    switch (action.type) {
        case SONG_CREATE_REVIEW_REQUEST:
            return {
                loading: true,
            }
            case SONG_CREATE_REVIEW_SUCCESS:
                return {
                    loading: false, success: true,
                }
                case SONG_CREATE_REVIEW_FAIL:
                    return {
                        loading: false, error: action.payload
                    }
                    case SONG_CREATE_REVIEW_RESET:
                        return {}
                        default:
                            return state

    }
}

export const songAddLikeReducer = (state = {

}, action) => {
    switch (action.type) {
        case SONG_ADD_LIKE_REQUEST:
            return {
                loading: true,
            }
            case SONG_ADD_LIKE_SUCCESS:
                return {
                    loading: false, success: true,
                }
                case SONG_ADD_LIKE_FAIL:
                    return {
                        loading: false, error: action.payload
                    }
                    case SONG_ADD_LIKE_RESET:
                        return {}
                        default:
                            return state

    }
}