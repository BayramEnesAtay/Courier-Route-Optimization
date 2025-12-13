import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
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
