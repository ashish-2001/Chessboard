import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Landing } from './screen/Landing.jsx';
import { Game } from './screen/Game.jsx';

function App() {

  return (
    <div className='h-screen bg-slate-950'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/game' element={<Game/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export {
  App
}
