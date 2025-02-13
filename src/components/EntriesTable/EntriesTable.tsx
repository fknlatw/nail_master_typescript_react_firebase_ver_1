import "./EntriesTable.scss";
import { useState, useEffect, useContext} from "react";
import { db } from "../../firebase";
import { collection, getDocs, where, query } from "firebase/firestore";
import { AuthContext } from "../../context/AuthContext";
import { EntriesContext, EntriesContextType } from "../../context/EntriesContext";



const EntriesTable = () => {
    const {data} = useContext(EntriesContext) as EntriesContextType;
    
    
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
            {data.map((item: any, index: any) => {
                
                return(
                    <tr key={index} className="table__row">
                        <td className="table__data">
                            {new Date(item.entrieDatetime.seconds * 1000).toLocaleString()}
                        </td>
                        <td className="table__data">{item.entrieType}</td>
                        <td className="table__data">{item.entrieClientName}</td>
                        <td className="table__data">{item.entriePhone}</td>
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