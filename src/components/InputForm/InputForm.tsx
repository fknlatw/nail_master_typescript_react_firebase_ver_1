import "./InputForm.scss";
import { useContext} from "react";
import { EntriesContext } from "../../context/EntriesContext";
import { EntriesContextType } from "../../types/types";

const InputForm = () => {
    const {
        isEditing, 
        handleAddEdit, entrie, setEntrie
    } = useContext(EntriesContext) as EntriesContextType;

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        setEntrie({
            ...entrie,
            [e.target.name]: e.target.value
        });
    }

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
                value={entrie.entrieDatetime}
                onChange={handleChange}
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
                value={entrie.entrieType}
                onChange={handleChange}
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
                value={entrie.entrieClientName}
                onChange={handleChange}
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
                value={entrie.entriePhone}
                onChange={handleChange}
            />

            <label 
                className="form__label" 
                htmlFor="entrieStatus"
            >Статус записи</label>

            <select 
                required
                className="form__select"
                name="entrieStatus" 
                value={entrie.entrieStatus}
                onChange={handleChange}
            >
                <option value="В процессе">В процессе</option>
                <option value="Завершен">Завершен</option>
            </select>

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