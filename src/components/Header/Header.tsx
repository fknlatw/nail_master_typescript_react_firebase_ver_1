import "./Header.scss";
import Logo from "/images/logo.png";
import { NavLink } from "react-router-dom";
import {useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { AuthContextType } from "../../types/types";
import { IoSearch } from "react-icons/io5";
import { EntriesContext } from "../../context/EntriesContext";
import { EntriesContextType } from "../../types/types";
import { FaXmark } from "react-icons/fa6";
import { FaReact } from "react-icons/fa";
import { RiFirebaseLine } from "react-icons/ri";
import { TbBrandTypescript } from "react-icons/tb";
import { FiltersContext } from "../../context/FiltersContext";
import { FiltersContextType } from "../../types/types";

const Header = () => {
  const { currentUser, handleLogout} = useContext(AuthContext) as AuthContextType;
  const { handleSearch, searchText, setSearchText } = useContext(EntriesContext) as EntriesContextType;
  const {selectedFilters, filteredArray} = useContext(FiltersContext) as FiltersContextType;
  const [isModalOpen, setIsModalOpen] = useState(false);

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
              onClick={handleLogout}
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
          <form className="search__form" onSubmit={(e)=>handleSearch(e, selectedFilters, filteredArray)} >
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