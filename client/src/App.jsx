import './App.css'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './components/Landing/LandingPage'
import HomePage from './components/HomePage/HomePage'

const App=()=>{
  return(
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
      </Routes>
    </div>
  )
}

export default App


