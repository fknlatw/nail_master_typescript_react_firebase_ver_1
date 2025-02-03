
import "./EntriesTable.scss";


const EntriesTable = () => {
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
            <tr className="table__row">
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
            </tr>
        </tbody>
    </table>
  )
}

export default EntriesTable;