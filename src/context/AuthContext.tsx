import { createContext, PropsWithChildren, useReducer } from "react";
import AuthReducer from "./AuthReducer";

type initialState = {
    currentUser: any,
    dispatch: any
}
const INITIAL_STATE: initialState = {
    currentUser: null,
    dispatch: ""
}

export const AuthContext = createContext(INITIAL_STATE);

const AuthProvider = ({children}:PropsWithChildren) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE)
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