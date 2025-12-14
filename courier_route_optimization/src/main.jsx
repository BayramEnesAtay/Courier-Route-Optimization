import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "primereact/resources/primereact.min.css";  
import "primeicons/primeicons.css";  
import "primereact/resources/themes/lara-light-blue/theme.css"; 
import './index.css'
import App from './App.jsx'

const Main = () => {
  return (
    <App />
  )
}
export default Main;
const root=createRoot(document.getElementById('root'));
root.render(<App/>);
