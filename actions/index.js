import { SET_ALLREPOS, SET_USERNAME, REMOVE_ALLREPOS } from '../utils/constants'
// 所有改動useContext的變數actions都在這裡統一控管

export const setUsername = (dispatch, name) => {
    dispatch({
        type: SET_USERNAME,
        payload: name
    })
}

export const setAllRepos = (dispatch, repos) => {
    dispatch({
        type: SET_ALLREPOS,
        payload: repos
    })
}

export const removeAllRepos = (dispatch, repos) => {
    dispatch({
        type: REMOVE_ALLREPOS,
        payload: repos
    })
}