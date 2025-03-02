import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from "./components/Header/Header";
import { PropsWithChildren, useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { AuthContextType } from "./types/types";

const App = () => {
  const {currentUser} = useContext(AuthContext) as AuthContextType;
  
  const RequireAuth = ({children}: PropsWithChildren) => {
    return currentUser ? children : <Navigate to="/login" />
  }

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route 
          element={<RequireAuth>
            <Home />
          </RequireAuth>} 
          path="/" 
        />

        <Route 
          element={<Login />} 
          path="/login" 
        />

        <Route 
          element={<Register />} 
          path="/register" 
        />
      </Routes>
    </div>
  )
}

export default App;
