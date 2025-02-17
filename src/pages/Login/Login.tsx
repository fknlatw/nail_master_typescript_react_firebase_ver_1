import "./Login.scss";
import {useContext, useState} from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import {auth} from "../../firebase";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { handleError } from "../../utils/handleError";

const Login = () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const {dispatch} = useContext(AuthContext);

  const navigate = useNavigate();

  

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if(email === "" || password === ""){
      handleError("неверный логин или пароль", setError);
      return;
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch({type: "LOGIN", payload: user});
        navigate("/");
      })
      .catch((err) => {
        const errorMessage = err.message;
        handleError(errorMessage, setError);
      });
  }

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