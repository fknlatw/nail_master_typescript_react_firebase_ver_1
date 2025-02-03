import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Header from "./components/Header/Header";

const App = () => {
  return (
    <div className="app">
      <Header />
      <Routes>
        <Route 
          element={<Home />} 
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
