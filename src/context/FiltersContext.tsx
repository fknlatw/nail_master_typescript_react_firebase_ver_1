import { 
    createContext, PropsWithChildren, useContext, 
    useEffect, useState 
} from "react"

import { EntriesContext } from "./EntriesContext";
import { 
    Entrie, EntriesContextType, FiltersContextType, 
    FiltersData, SelectedFilters
} from "../types/types";

import { formatDateToString } from "../utils/dateFormatting";
import { selectedFiltersDelaultValue } from "../constants/constants";


export const FiltersContext = createContext<FiltersContextType | "">("");

export const FiltersProvider = ({children}: PropsWithChildren) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const {data, setEntries} = useContext(EntriesContext) as EntriesContextType;

    const [selectedFilters, setSelectedFilters] = useState<SelectedFilters>({
        entrieDatetime: "",
        entrieType: "",
        entrieClientName: "",
        entrieStatus: ""
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
        entrieStatuses: []
    });

    const [filteredArray, setFilteredArray] = useState<Entrie []>([]);

    const getFiltersData = (array: any) => {
        let dates: string[] = [];
        let types: string[]= [];
        let clientNames: string[] = [];
        let statuses: string[] = [] 

        array.forEach((entrie: Entrie)=>{
            dates.push(formatDateToString(entrie.entrieDatetime.seconds));
            types.push(entrie.entrieType)
            clientNames.push(entrie.entrieClientName);
            statuses.push(entrie.entrieStatus)
        });

        return {
            entrieDatetimes: Array.from(new Set(dates)),
            entrieTypes: Array.from(new Set(types)),
            entrieClientNames: Array.from(new Set(clientNames)),
            entrieStatuses: Array.from(new Set(statuses)),
        }
    }
         
    useEffect(()=>{
        setFiltersData(getFiltersData(data));
    }, [data]);

    const resetFilters = () => {
        if(selectedFilters === selectedFiltersDelaultValue) return;
        setSelectedFilters(selectedFiltersDelaultValue as SelectedFilters);
    }
    
    const submitFilters = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {entrieDatetime, entrieType, entrieClientName, entrieStatus} = selectedFilters;

        let filteredArray: any = data;

        if(!entrieDatetime && !entrieType && !entrieClientName && !entrieStatus){
            setEntries(data);
            setFiltersData(getFiltersData(data));
            return;
        }
    
        if(entrieDatetime){
            filteredArray = filteredArray.filter((item: any) => 
                entrieDatetime === formatDateToString(item.entrieDatetime.seconds
            ));
        }
        if(entrieType){
            filteredArray = filteredArray.filter((item: any) => 
                item.entrieType === entrieType
            );
        }
        if(entrieClientName){
            filteredArray = filteredArray.filter((item: any) => 
                item.entrieClientName === entrieClientName
            );
        }
        if(entrieStatus){
            filteredArray = filteredArray.filter((item: any) => item.entrieStatus === entrieStatus)
        }

        setEntries(filteredArray);
        setFilteredArray(filteredArray);
        setFiltersData(getFiltersData(filteredArray));
    }

    return <FiltersContext.Provider value={{
        submitFilters, 
        setIsOpen, 
        isOpen,
        selectedFilters,
        handleChange,
        filtersData,
        filteredArray,
        resetFilters
    }}>
        {children}
    </FiltersContext.Provider>
}