import "./Login.scss";
import {useContext} from "react";
import { AuthContext } from "../../context/AuthContext";
import { AuthContextType } from "../../types/types";



const Login = () => {
  const {handleLogin, setEmail, email, 
    error, password, setPassword} = useContext(AuthContext) as AuthContextType;
  
  return (
    <div className="container login__container">

      <form  
        onSubmit={handleLogin}
        className="login__form"
      >
        <h2>Вход в систему</h2>
        <label htmlFor="userEmail">Почта</label>

        <input 
          type="text" 
          onChange={e=>setEmail(e.target.value)}
          name="userEmail"
          value={email}
        />
        <label htmlFor="userPassword">Пароль</label>

        <input 
          type="text" 
          name="userPassword" 
          onChange={e=>setPassword(e.target.value)}
          value={password}
        />

        <button type="submit">Войти</button>
        {error && <span className="login__error">{error}</span>}
      </form>
    </div>
  )
}

export default Login;