import { createContext, useState } from 'react'

 export let UserContext=createContext();

 export default function UserContextProvider(props){
         let [isLogin,SetIsLogin]=useState(null);
         return(
            <>
            <UserContext.Provider value={{isLogin,SetIsLogin}}>
                {props.children}

            </UserContext.Provider>
            </>
         )
 }
