import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router} from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import "./index.scss";
import App from "./App.tsx";



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Router>
        <App /> 
      </Router>
    </AuthProvider>
  </StrictMode>,
)
