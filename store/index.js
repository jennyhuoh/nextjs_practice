import { createContext, useReducer } from 'react';
import { SET_USERNAME, SET_ALLREPOS } from '../utils/constants';

export const StoreContext = createContext();
let items = []
const initialState = {
    username: 'jennyhuoh',
    allRepos: {items}
}

function reducer(state, action) {
    switch (action.type) {
        case SET_USERNAME:
            return {
                ...state,
                username: action.payload
            }
        case SET_ALLREPOS:
            let repos = action.payload
            Array.prototype.push.apply(items, repos)
            console.log(items)
            return{
                ...state,
                allRepos: {...state.allRepos, items}
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