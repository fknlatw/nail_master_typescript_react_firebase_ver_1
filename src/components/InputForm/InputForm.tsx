import "./InputForm.scss";
import { useContext} from "react";
import { addDoc, collection, Timestamp, updateDoc, doc } from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";
import { EntriesContext, EntriesContextType } from "../../context/EntriesContext";



const InputForm = () => {
    

    const {currentUser
    } = useContext(AuthContext);
    const {fetchData, datetime, setDatetime,
        type, setType, clientName,
        setClientName, phone, setPhone, 
        isEditing, setIsEditing} = useContext(EntriesContext) as EntriesContextType;


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if(isEditing.status === true){
                const { userId, entrieId } = isEditing.currentEntrie;
                
                // console.log({
                //     userId: userId,
                //     entrieId: entrieId,
                //     entrieDatetime: Timestamp.fromDate(new Date(datetime)),
                //     entrieType: type,
                //     entrieClientName: clientName,
                //     entriePhone: phone,
                // })
                await updateDoc(doc(db, "entries", entrieId), {
                    userId: userId,
                    entrieId: entrieId,
                    entrieDatetime: Timestamp.fromDate(new Date(datetime)),
                    entrieType: type,
                    entrieClientName: clientName,
                    entriePhone: phone,
                });
            }else{
                await addDoc(collection(db, "entries"), {
                    entrieClientName: clientName,
                    entrieDatetime: Timestamp.fromDate(new Date(datetime)),
                    entriePhone: phone,
                    entrieType: type,
                    userId: currentUser.uid
                });
            }

            fetchData();

            setDatetime("");
            setType("");
            setClientName("");
            setPhone("");
            setIsEditing({currentEntrie: {}, status: false});

        } catch (err) {
            console.log(err);
        }
    }

    return (
        <form 
            className="form" 
            onSubmit={handleSubmit}
            
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