import ReactDOM from 'react-dom/client'
import App from './components/App/App.tsx'
import './main.scss'
import {BrowserRouter} from "react-router-dom";
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/700.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
    <BrowserRouter>
        <App />
    </BrowserRouter>
  ,
)
