import "./InputForm.scss";
import { useContext} from "react";
import { EntriesContext } from "../../context/EntriesContext";
import { EntriesContextType } from "../../types/types";

const InputForm = () => {
    const {
        datetime, setDatetime, type, 
        setType, clientName, setClientName, 
        phone, setPhone, isEditing, 
        handleAddEdit
    } = useContext(EntriesContext) as EntriesContextType;

    return (
        <form 
            className="form" 
            onSubmit={handleAddEdit}
            
        >
            <h2>Добавить запись</h2>
            <label 
                className="form__label" 
                htmlFor="entrieDatetime"
            >Дата и время</label>

            <input 
                required
                className="form__input"
                name="entrieDatetime" 
                type="datetime-local" 
                value={datetime}
                onChange={(e) => setDatetime(e.target.value)}
            />

            <label 
                className="form__label" 
                htmlFor="entrieType"
            >Тип</label>

            <input 
                required
                className="form__input"
                name="entrieType" 
                type="text" 
                value={type}
                onChange={(e)=>setType(e.target.value)}
            />

            <label 
                className="form__label" 
                htmlFor="entrieClientName"
            >Имя клиента</label>

            <input 
                required
                className="form__input"
                name="entrieClientName" 
                type="text"  
                value={clientName}
                onChange={(e)=>setClientName(e.target.value)}
            />

            <label 
                className="form__label" 
                htmlFor="entriePhone"
            >Телефон клиента</label>

            <input 
                required
                className="form__input"
                name="entriePhone" 
                type="text" 
                value={phone}
                onChange={(e)=>setPhone(e.target.value)}
            />

            <button 
                className="form__button" 
                type="submit"
            >
                {isEditing.status
                ? "Редактировать запись" 
                : "Добавить запись"}
            </button>

        </form>
    );
}

export default InputForm;