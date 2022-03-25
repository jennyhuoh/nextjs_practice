import { SET_ALLREPOS, SET_USERNAME } from '../utils/constants'

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