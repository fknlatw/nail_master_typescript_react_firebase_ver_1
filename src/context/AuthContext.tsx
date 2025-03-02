import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { handleError } from "../utils/handleError";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase.ts";
import { setDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "../types/types.ts";


export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider = ({children}:PropsWithChildren) => {
  const user = localStorage.getItem("user")
  const [currentUser, setCurrentUser] = useState(
    user ? JSON.parse(user) : null
  );
  console.log(currentUser)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if(email === "" || password === ""){
      handleError("Заполните все поля", setError);
      return;
    }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
    
      await setDoc(doc(db, "users", res.user.uid), {
        userEmail: email,
        userPassword: password
      });
    
    } catch (err: any) {
      const errorMessage = err.message;
      handleError(errorMessage, setError);
    }
  }

  const handleLogout = () => {
    setCurrentUser(null);
  }

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if(email === "" || password === ""){
      handleError("неверный логин или пароль", setError);
      return;
    }
  
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setCurrentUser(user);
        navigate("/");
    })
      .catch((err) => {
        const errorMessage = err.message;
        handleError(errorMessage, setError);
    });
  }

  useEffect(()=>{
    localStorage.setItem("user", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{
      currentUser,
      error,
      setError,
      email,
      setEmail,
      password,
      setPassword,
      handleRegister,
      handleLogin,
      handleLogout
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider