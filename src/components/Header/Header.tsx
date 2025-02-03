import "./Header.scss";
import Logo from "/images/logo.png";
import { NavLink } from "react-router-dom";

const Header = () => {
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
            <NavLink 
              to="/login" 
              className={({ isActive }) => isActive 
              ? "list__link--active list__link" : "list__link"} 
            >
              Войти
            </NavLink>
          </li>
          
          
          
          <li className="list__item">
            <NavLink 
              className={({ isActive }) => isActive 
              ? "list__link--active list__link" : " list__link"} 
              to="/register"
            >
              Регистрация
            </NavLink>
          </li>

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