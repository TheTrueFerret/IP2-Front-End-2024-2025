import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/homePage/HomePage'
import { GamePage } from './pages/gamePage/GamePage'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Game' element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
