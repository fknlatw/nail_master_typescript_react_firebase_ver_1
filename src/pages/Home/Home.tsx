import EntriesTable from "../../components/EntriesTable/EntriesTable";
import FiltersForm from "../../components/FiltersForm/FiltersForm";
import InputForm from "../../components/InputForm/InputForm";
import "./Home.scss";

const Home = () => {
  return (
    <div className="container home__container">
      <div className="left__wrapper">
        <InputForm />
        <FiltersForm />
      </div>

      <div className="right__wrapper">
        <EntriesTable />
      </div>
    </div>
  )
}

export default Home