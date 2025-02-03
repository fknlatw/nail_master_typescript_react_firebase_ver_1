import "./InputForm.scss";


const InputForm = () => {
    return (
        <form className="form">
            <h2>Добавить запись</h2>
            <label 
                className="form__label" 
                htmlFor="entrieDatetime"
            >Дата и время</label>

            <input 
                className="form__input"
                name="entrieDatetime" 
                type="datetime-local" 
            />

            <label 
                className="form__label" 
                htmlFor="entrieType"
            >Тип</label>

            <input 
                className="form__input"
                name="entrieType" 
                type="text" 
            />

            <label 
                className="form__label" 
                htmlFor="entrieClientName"
            >Имя клиента</label>

            <input 
                className="form__input"
                name="entrieClientName" 
                type="text"  
            />

            <label 
                className="form__label" 
                htmlFor="entriePhone"
            >Телефон клиента</label>

            <input 
                className="form__input"
                name="entriePhone" 
                type="text" 
            />

            <button 
                className="form__button" 
                type="submit"
            >Добавить запись</button>

        </form>
    );
}

export default InputForm;