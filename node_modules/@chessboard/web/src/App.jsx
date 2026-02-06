import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from './screen/Landing.jsx';
import { Game } from './screen/Game.jsx';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/game' element={<Game/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export {
  App
}
