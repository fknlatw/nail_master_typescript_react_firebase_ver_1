import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router} from "react-router-dom";
import AuthProvider from "./context/AuthContext";
import EntriesProvider from "./context/EntriesContext.tsx";
import "./index.scss";
import App from "./App.tsx";



createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <EntriesProvider>
        <Router>
          <App /> 
        </Router>
      </EntriesProvider>
    </AuthProvider>
  </StrictMode>,
)
