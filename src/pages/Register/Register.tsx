
import "./Register.scss";



const Register = () => {
  return (
    <div className="container register__container">
      <form 
        className="register__form"
      >
        <h2>Регистрация в базе</h2>
        <label htmlFor="userName">Имя пользователя</label>

        <input 
          name="userName" 
          type="text" 
        />
        <label htmlFor="userPassword">Пароль</label>

        <input 
          type="text" 
          name="userPassword" 
        />

        <button type="submit">Регистрация</button>

      </form>
    </div>
  )
}

export default Register