import './App.css'
import {Routes, Route, Form} from 'react-router-dom'
import LandingPage from './components/Landing/LandingPage'
import HomePage from './components/HomePage/HomePage'
import Detail from './components/Detail/Detail'
import CreateForm from './components/Form/CreateForm'

const App=()=>{
  return(
    <div>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/home' element={<HomePage/>}></Route>
        <Route path='/pokemons/:name' element={<Detail/>}></Route>
        <Route path='/pokemons' element={<CreateForm/>}></Route>
      </Routes>
    </div>
  )
}

export default App


