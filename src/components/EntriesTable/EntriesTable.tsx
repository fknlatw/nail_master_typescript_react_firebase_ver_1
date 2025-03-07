import "./EntriesTable.scss";
import { useContext} from "react";
import { EntriesContext } from "../../context/EntriesContext";
import { Entrie, EntriesContextType } from "../../types/types";
import { FaTrash } from "react-icons/fa";
import { MdEdit } from "react-icons/md";



const EntriesTable = () => {
    const { entries, isLoading, deleteEntrie, editEntrie, isEditing } = useContext(EntriesContext) as EntriesContextType;
    
    if(isLoading){
        return (
            <div className="loading">
                <h2 className="loading__text">Загрузка...</h2>
            </div>
        )
    }
    
    
  return (
    <table className="table">
        <thead className="table__head">
            <tr className="table__row">
                <td className="table__data">Дата и время</td>
                <td className="table__data">Тип</td>
                <td className="table__data">Имя Кл.</td>
                <td className="table__data">Телефон Кл.</td>
            </tr>
        </thead>
        <tbody className="table__body">
            {entries?.map((item: Entrie) => {
                
                return(
                    <tr key={item.entrieId} className="table__row">
                        <td className="table__data">
                            {new Date(item.entrieDatetime.seconds * 1000).toLocaleString()}
                        </td>
                        <td className="table__data">{item.entrieType}</td>
                        <td className="table__data">{item.entrieClientName}</td>
                        <td className="table__data">{item.entriePhone}
                            
                            {!isEditing.status && <div className="data__buttons">
                                <button 
                                    onClick={()=>deleteEntrie(item.entrieId)}
                                    className="delete__entrie__button"
                                >
                                    <FaTrash/>
                                </button>
                                <button 
                                    onClick={()=>editEntrie(item)}
                                    className="edit__entrie__button"
                                >
                                    <MdEdit/>
                                </button>
                            </div>}
                        </td>
                        
                    </tr>
                )
            })}

            {/* <tr className="table__row">
                <td className="table__data">18-12-2025-13:00:00</td>
                <td className="table__data">Маникюр</td>
                <td className="table__data">Алиса</td>
                <td className="table__data">8(900)592-37-55</td>
            </tr>
            <tr className="table__row">
                <td className="table__data">18-12-2025-15:00:00</td>
                <td className="table__data">Педикюр</td>
                <td className="table__data">Елена</td>
                <td className="table__data">8(908)792-92-31</td>
            </tr>
            <tr className="table__row">
                <td className="table__data">18-12-2025-17:00:00</td>
                <td className="table__data">Маникюр</td>
                <td className="table__data">Елена</td>
                <td className="table__data">8(908)792-92-31</td>
            </tr> */}
        </tbody>
    </table>
  )
}



export default EntriesTable;