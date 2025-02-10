import { createContext, PropsWithChildren, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

type initialState = {
    currentUser: any,
    dispatch: any
}
const INITIAL_STATE: initialState = {
    currentUser: JSON.parse(localStorage.getItem("user")!) || null,
    dispatch: ""
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({children}:PropsWithChildren) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(()=>{
        localStorage.setItem("user", JSON.stringify(state.currentUser));
    }, [state.currentUser]);

    return (
        <AuthContext.Provider value={{
            currentUser: state.currentUser,
            dispatch
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider