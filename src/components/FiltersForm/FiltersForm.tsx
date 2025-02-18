import {useState, useContext, useEffect} from "react";
import { MdFilterList } from 'react-icons/md';
import "./FiltersForm.scss";
import { EntriesContext, EntriesContextType } from "../../context/EntriesContext";


const FiltersForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    const {data, setEntries} = useContext(EntriesContext) as EntriesContextType;

    const [selectedfilters, setSelectedFilters] = useState({
        entrieDatetime: "",
        entrieType: "",
        entrieClientName: "",
    });

    const handleChange = (e:any) => {
        setSelectedFilters({
            ...selectedfilters,
            [e.target.name]: e.target.value
        })
    }

    const [filtersData, setFiltersData]: any = useState({
        entrieDatetimes: [] ,
        entrieTypes: [],
        entrieClientNames: [],
    });

   

    

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

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const {entrieDatetime, entrieType, entrieClientName} = selectedfilters;

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
    }
    
    return (
        <form className="filters__form" onSubmit={handleSubmit}>
            <div className="filters__header">
                <h2 className="filters__title">Фильтры</h2>

                <button 
                    type="button" 
                    className="filters__button" 
                    onClick={()=>setIsOpen(!isOpen)}
                >
                    <MdFilterList  />
                </button>
            </div>

              
            {isOpen && <div className="filters__content">
                <label htmlFor="entrieDatetime">Дата</label>


                <select 
                    name="entrieDatetime"
                    value={selectedfilters.entrieDatetime} 
                    onChange={handleChange}
                >
                    <option value=""></option>
                    {
                        filtersData.entrieDatetimes.map((date: string, index: number) =>{
                            return (
                            <option 
                                key={index} 
                                value={date}
                            >
                                {date}
                            </option>)
                        })
                    }
                </select>

                <label htmlFor="entrieType">Тип</label>


                <select 
                    name="entrieType"
                    value={selectedfilters.entrieType} 
                    onChange={handleChange}
                >
                    <option value=""></option>
                    {
                        filtersData.entrieTypes.map((type: string, index: number) => {
                            return(
                                <option
                                    value={type}
                                    key={index}
                                >
                                    {type}
                                </option>
                            )
                        })
                    }
                </select>

                <label htmlFor="entrieClientName">Имя клиента</label>


                <select 
                    name="entrieClientName"
                    value={selectedfilters.entrieClientName}
                    onChange={handleChange}
                >
                    <option value=""></option>
                    {
                        filtersData.entrieClientNames.map((clientName: string, index: number) => {
                            return(
                                <option
                                    value={clientName}
                                    key={index}
                                >
                                    {clientName}
                                </option>
                            )
                        })
                    }
                </select>

                <button type="submit">
                    Применить
                </button>

            </div>}
            
        </form>
    )
}

export default FiltersForm;