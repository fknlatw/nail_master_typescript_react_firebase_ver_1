import "./Header.scss";
import Logo from "/images/logo.png";
import { NavLink } from "react-router-dom";
import React, {useContext, useState} from "react";
import { AuthContext } from "../../context/AuthContext";
import { IoSearch } from "react-icons/io5";
import { EntriesContext, EntriesContextType } from "../../context/EntriesContext";

const Header = () => {
  const { currentUser, dispatch } = useContext(AuthContext);
  const {entries, setEntries, data} = useContext(EntriesContext) as EntriesContextType;
  const [searchText, setSearchText] = useState("");

  const logOut = () => {
    dispatch({type: "LOGOUT"})
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(searchText === ""){
      setEntries(data);
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

        
      </div>
    </header>
  );
}

export default Header;