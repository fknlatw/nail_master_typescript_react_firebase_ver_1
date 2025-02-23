import {useContext} from "react";
import { MdFilterList } from 'react-icons/md';
import "./FiltersForm.scss";
import { FiltersContext, FiltersContextType } from "../../context/FiltersContext";


const FiltersForm = () => {
    const {
        submitFilters, setIsOpen, isOpen,
        selectedfilters, handleChange, filtersData
    } = useContext(FiltersContext) as FiltersContextType;

    return (
        <form className="filters__form" onSubmit={submitFilters}>
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