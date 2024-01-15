import './App.css'
import {Routes, Route} from 'react-router-dom'
import LandingPage from './components/Landing/LandingPage'
import HomePage from './components/HomePage/HomePage'
import Detail from './components/Detail/Detail'

const App=()=>{
  return(
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/pokemons/:name' element={<Detail/>}></Route>
      </Routes>
    </div>
  )
}

export default App


