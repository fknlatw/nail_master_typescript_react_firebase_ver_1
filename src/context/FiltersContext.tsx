import { createContext, PropsWithChildren } from "react";

type FiltersContextType = {
    name: any
}

const name = "name"

export const FiltersContext = createContext<FiltersContextType>({name});

export const FiltersProvider = ({children}: PropsWithChildren) => {
    return <FiltersContext.Provider value={{
        name
    }}>
        {children}
    </FiltersContext.Provider>
}