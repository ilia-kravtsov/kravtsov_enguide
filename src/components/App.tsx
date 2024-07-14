import s from '../styles/components/App.module.scss';
import {Route, Routes} from "react-router-dom";
import {Hero} from "./Hero.tsx";
import {Dictionary} from "./Dictionary.tsx";
import {Header} from "./Header.tsx";

function App() {

    return (
      <div className={s.container}>
          <Header/>
          <h1>kravtsov enguide</h1>

          <div className={s.display}>
              <Routes>
                  <Route path='/' element={<Hero />}/>
                  <Route path='/dictionary' element={<Dictionary />}/>
              </Routes>
          </div>

      </div>
    )
}

export default App
