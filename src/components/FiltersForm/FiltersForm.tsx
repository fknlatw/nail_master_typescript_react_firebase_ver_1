import {useState} from "react";
import { MdFilterList } from 'react-icons/md';
import "./FiltersForm.scss";

const FiltersForm = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <form className="filters__form">
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
                <label htmlFor="">Дата</label>
                <input type="text" />
                <label htmlFor="">Тип</label>
                <input type="text" />
                <label htmlFor="">Имя клиента</label>
                <input type="text" />
                <label htmlFor="">Телефон клиента</label>
                <input type="text" />
                <button>
                    Применить
                </button>
            </div>}
            
        </form>
    )
}

export default FiltersForm;