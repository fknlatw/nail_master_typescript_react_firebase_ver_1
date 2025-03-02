import "./Register.scss";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { AuthContextType } from "../../types/types";



const Register = () => {
  const {error, email, password,
    setEmail, setPassword, handleRegister} = useContext(AuthContext) as AuthContextType;

  return (
    <div className="container register__container">
      <form 
        onSubmit={handleRegister}
        className="register__form"
      >
        <h2>Регистрация в базе</h2>
        <label htmlFor="userEmail">Почта</label>

        <input 
          name="userEmail" 
          type="text" 
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />
        <label htmlFor="userPassword">Пароль</label>

        <input 
          type="text" 
          name="userPassword" 
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
        />


        <button type="submit">Регистрация</button>
        {error && <span className="login__error">{error}</span>}

      </form>
    </div>
  )
}

export default Register