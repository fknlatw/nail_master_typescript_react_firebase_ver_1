import "./Header.scss";
import Logo from "/images/logo.png";
import { NavLink } from "react-router-dom";
import {useContext} from "react";
import { AuthContext } from "../../context/AuthContext";

const Header = () => {
  const { currentUser, dispatch } = useContext(AuthContext);

  const logOut = () => {
    dispatch({type: "LOGOUT"})
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
        </ul>
      </div>
    </header>
  );
}

export default Header;