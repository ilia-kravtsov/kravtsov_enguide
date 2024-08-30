import s from '../styles/components/App.module.scss';
import {Route, Routes} from "react-router-dom";
import {Home} from "./Home.tsx";
import {Dictionary} from "./Dictionary.tsx";
import {Header} from "./Header.tsx";
import {Expressions} from "./Expressions.tsx";

function App() {

    return (

        <div className={s.container}>

            <Header/>

            <div className={s.display}>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/dictionary' element={<Dictionary/>}/>
                    <Route path='/expressions' element={<Expressions/>}/>
                </Routes>
            </div>

        </div>
    )
}

export default App
