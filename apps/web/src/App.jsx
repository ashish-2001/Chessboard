import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
      <BrowserRouter basename='/app'>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/game' element={<Game/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
