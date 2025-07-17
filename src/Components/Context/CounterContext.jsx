import { createContext, useState } from 'react'

 export let CounterContext=createContext();

 export default function CounterContextProvider(props){
         let [counter,SetCounter]=useState(0);
         return(
            <>
            <CounterContext.Provider value={{counter,SetCounter}}>
                {props.children}

            </CounterContext.Provider>
            </>
         )
 }
