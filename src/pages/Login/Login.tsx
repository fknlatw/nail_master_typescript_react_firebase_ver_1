
import "./Login.scss";

const Login = () => {
  

  return (
    <div className="container login__container">

      <form className="login__form">
        <h2>Вход в систему</h2>
        <label htmlFor="userName">Имя пользователя</label>

        <input 
          type="text" 
          name="userName"
        />
        <label htmlFor="userPassword">Пароль</label>

        <input 
          type="text" 
          name="userPassword" 
        />

        <button type="submit">Войти</button>
      </form>
    </div>
  )
}

export default Login;