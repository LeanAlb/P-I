import './App.css'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './components/Landing/LandingPage'

const App=()=>{
  return(
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
      </Routes>
    </div>
  )
}

export default App

