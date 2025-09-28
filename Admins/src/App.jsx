import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
function App() {

  return (
    <Routes>
      <Route path='/'/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/login' element={<Dashboard/>}/>
    </Routes>
  )
}

export default App
