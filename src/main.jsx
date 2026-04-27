import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./style/StyleGlobal.css";
import Login from './components/Login.jsx';
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
