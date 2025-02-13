
import "./Register.scss";
import { useState } from "react";
import { auth, db } from "../../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";



const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", res.user.uid), {
        userEmail: email,
        userPassword: password
      });
    } catch (err) {
      console.log(err)
    }
  }


  return (
    <div className="container register__container">
      <form 
        onSubmit={handleSubmit}
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

      </form>
    </div>
  )
}

export default Register