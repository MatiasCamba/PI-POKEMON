
import './App.css'
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Form from './components/Form/Form'
import NavBar from './components/NavBar/NavBar'


function App() {


  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route exact path='/' element={<Landing />} /> 
        <Route path='/home' element={<Home />} />
        <Route path='/form' element= {<Form />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App

