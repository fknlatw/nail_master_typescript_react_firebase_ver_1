import "./Header.scss";
import Logo from "/images/logo.png";
import { NavLink } from "react-router-dom";
import React, {useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { IoSearch } from "react-icons/io5";
import { EntriesContext, EntriesContextType } from "../../context/EntriesContext";
import { FiltersContext, FiltersContextType } from "../../context/FiltersContext";
import { FaXmark } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { RiFirebaseLine } from "react-icons/ri";
import { TbBrandTypescript } from "react-icons/tb";

const Header = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const {entries, setEntries, data} = useContext(EntriesContext) as EntriesContextType;
  const {selectedfilters, filteredArray} = useContext(FiltersContext) as FiltersContextType;
  const [searchText, setSearchText] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const logOut = () => {
    dispatch({type: "LOGOUT"})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(searchText === ""){
      
      const {entrieDatetime, entrieType, entrieClientName} = selectedfilters;
      if(entrieDatetime === "" && entrieType === "" && entrieClientName === ""){
        setEntries(data);
        return;
      } else {
        console.log(filteredArray)
        setEntries(filteredArray);
        return;
      }
    }

    const searchResult = entries.filter((entrie:any)=>{
      for(let i in entrie){
        if(typeof(entrie[i]) === "string"){
          if(entrie[i].toLowerCase().includes(searchText.toLowerCase())){
            return true
          };
        }
      }
    });

    setEntries(searchResult);
  }

  return (
    <header className="header">
      <div className="header__container">
        <img 
          onClick={()=>setIsModalOpen(!isModalOpen)}
          className="header__image" 
          src={Logo} 
          alt="logo" 
        />

        <ul className="header__list">
          <li className="list__item">
            {currentUser === null
            ?
            <>
              <NavLink 
                to="/login" 
                className={({ isActive }) => isActive 
                ? "list__link--active list__link" : "list__link"} 
              >
                Войти
              </NavLink>

            </>

            
            :<a 
              className="logout__button"
              onClick={logOut}
            >Выйти</a>}
          </li>
          
          {!currentUser &&<li className="list__item">
            <NavLink 
              className={({ isActive }) => isActive 
              ? "list__link--active list__link" : " list__link"} 
              to="/register"
            >
              Регистрация
            </NavLink>
          </li>}
          
          

          <li className="list__item">
            <NavLink  
              to="/" 
              className={({ isActive }) => isActive 
              ? "list__link--active list__link" : " list__link"} 
            >
              Приложение
            </NavLink>
          </li>
          <form className="search__form" onSubmit={handleSubmit} >
            <button 
              type="submit" 
              className="search__button"
            >
              <IoSearch />
            </button>

            <input 
              value={searchText} 
              className="search__input" 
              type="text"
              onChange={(e)=>setSearchText(e.target.value)} 
            />
          </form>
        </ul>

        {isModalOpen && <div className="header__banner">
          <button 
            className="banner__toggle__button"
            onClick={()=>setIsModalOpen(!isModalOpen)}
          >
            <FaXmark/>
          </button>

          <div className="banner__container">
            <h6>MADE BY FLATW 2025</h6>
            <ul>
              <li>TECH:</li>
              <li>REACT <FaReact/></li>
              <li>FIREBASE <RiFirebaseLine/></li>
              <li>TYPESCRIPT <TbBrandTypescript/></li>
            </ul>
            <ul>
              <li>LINKS:</li>
              <li><a href="https://github.com/fknlatw">GITHUB</a></li>
            </ul>
          </div>
        </div>}
      </div>
    </header>
  );
}

export default Header;