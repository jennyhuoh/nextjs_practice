import { createContext, useReducer } from 'react';
import { SET_USERNAME } from '../utils/constants';

export const StoreContext = createContext();

const initialState = {
    username: 'jennyhuoh'
}

function reducer(state, action) {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        default:
            return state;
    }
}

export function StoreProvider(props) {
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = {state, dispatch}

    return(
        <StoreContext.Provider value={value}>
            {props.children}
        </StoreContext.Provider>
    );
}