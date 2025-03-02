import { createContext, PropsWithChildren, useContext, useEffect, useState } from "react";
import { EntriesContext } from "./EntriesContext";
import { Entrie, EntriesContextType, FiltersContextType, FiltersData } from "../types/types";


export const FiltersContext = createContext<FiltersContextType | "">("");

export const FiltersProvider = ({children}: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState(false);

    const {data, setEntries} = useContext(EntriesContext) as EntriesContextType;

    const [selectedFilters, setSelectedFilters] = useState({
        entrieDatetime: "",
        entrieType: "",
        entrieClientName: "",
    });
    
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedFilters({
            ...selectedFilters,
            [e.target.name]: e.target.value
        });
    }
    
    const [filtersData, setFiltersData] = useState<FiltersData>({
        entrieDatetimes: [] ,
        entrieTypes: [],
        entrieClientNames: [],
    });

    const [filteredArray, setFilteredArray] = useState<Array<Entrie>>([]);
         
    useEffect(()=>{
        const getFiltersData = () => {
            let dates: any = [];
            let types: any= [];
            let clientNames: any = [];
    
            data.forEach((entrie: any)=>{
                dates.push(new Date(entrie.entrieDatetime.seconds * 1000).toLocaleDateString());
                types.push(entrie.entrieType)
                clientNames.push(entrie.entrieClientName);
            });
    
            return {
                entrieDatetimes: Array.from(new Set(dates)),
                entrieTypes: Array.from(new Set(types)),
                entrieClientNames: Array.from(new Set(clientNames))
            }
        }
    
        setFiltersData(getFiltersData());
    }, [data]);
    
    const submitFilters = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {entrieDatetime, entrieType, entrieClientName} = selectedFilters;
    
        if(entrieDatetime === "" && entrieType === "" && entrieClientName === ""){
            setEntries(data);
            return;
        }
    
        const filteredArray =  data.filter((entrie: any) => {
            const date = new Date(entrie.entrieDatetime.seconds * 1000).toLocaleDateString();
            //dumb code
            if(entrieDatetime !== "" 
            && entrieType !== "" 
            && entrieClientName !== ""){
                if(date === entrieDatetime 
                && entrieType === entrie.entrieType 
                && entrieClientName === entrie.entrieClientName) return true;
            }else if (entrieDatetime !== ""
            && entrieType !== ""){
                if(date === entrieDatetime 
                && entrieType === entrie.entrieType) return true;
            }else if(entrieDatetime !== ""
            && entrieClientName !== ""){
                if(date === entrieDatetime 
                && entrieClientName === entrie.entrieClientName) return true;
            }else if(entrieClientName !== ""
            && entrieType !== ""){
                if(entrie.entrieClientName === entrieClientName 
                && entrie.entrieType === entrieType) return true;
            }else if(entrieDatetime){
                    if(date === entrieDatetime) return true;
            }else if(entrieType){
                if(entrieType === entrie.entrieType) return true;
            }else if(entrieClientName){
                if(entrieClientName === entrie.entrieClientName) return true;
            }
        });
    
        setEntries(filteredArray);
        setFilteredArray(filteredArray);
    }

    return <FiltersContext.Provider value={{
        submitFilters, 
        setIsOpen, 
        isOpen,
        selectedFilters,
        handleChange,
        filtersData,
        filteredArray
    }}>
        {children}
    </FiltersContext.Provider>
}