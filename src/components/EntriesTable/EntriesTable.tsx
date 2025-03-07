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
                <td className="table__data">Статус</td>
                <td className="table__data">Телефон Кл.</td>
            </tr>
        </thead>
        <tbody className="table__body">
            {entries?.map((item: Entrie) => {
                return(
                    <tr key={item.entrieId} 
                        className={item.entrieStatus === "В процессе"?
                            "table__row table__row--process":
                            "table__row table__row--success"
                        }
                    >
                        <td className="table__data">
                            {new Date(item.entrieDatetime.seconds * 1000).toLocaleString()}
                        </td>

                        <td className="table__data">
                            {item.entrieType}
                        </td>

                        <td className="table__data">
                            {item.entrieClientName}
                        </td>

                        <td 
                            className="table__data">
                            {item.entrieStatus}
                        </td>

                        <td className="table__data">
                            {item.entriePhone}
                            
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
        </tbody>
    </table>
  )
}



export default EntriesTable;