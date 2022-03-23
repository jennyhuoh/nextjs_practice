import { SET_USERNAME } from '../utils/constants'

export const setUsername = (dispatch, name) => {
    dispatch({
        type: SET_USERNAME,
        payload: name
    })
}