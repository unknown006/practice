import React,{ createContext,useReducer } from 'react';
import glbState from './state';
import glbReducer from './reducer';
const GlbContext=createContext();

function Store(props){
    const [state,dispatch]=useReducer(glbReducer,glbState)
    return (
        <GlbContext.Provider value={[ state,dispatch]}>
            { props.children }
        </GlbContext.Provider>
    )
}
export const glbContext = GlbContext;


export default Store;


