
import { MdFilterList } from 'react-icons/md';
import "./FiltersForm.scss";

const FiltersForm = () => {

    return (
        <form className="filters__form">
            <div className="filters__header">
                <h2 className="filters__title">Фильтры</h2>

                <button 
                    type="button" 
                    className="filters__button" 
                >
                    <MdFilterList  />
                </button>
            </div>

              
            <div className="filters__content">
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
            </div>
            
        </form>
    )
}

export default FiltersForm;