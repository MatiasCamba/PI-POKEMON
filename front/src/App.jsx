
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Landing from './components/Landing/Landing'
import Home from './components/Home/Home'
import Form from './components/Form/Form'
import NavBar from './components/NavBar/NavBar'
import About from './components/About/About'
import CardDetail from './components/CardDetail/CardDetail'
import Footer from './components/Footer/Footer'


function App() {


  return (
  <>
    <NavBar />
    <hr />
      <Routes>
        <Route exact path='/' element={<Landing />} /> 
        <Route path='/home' element={<Home />} />
        <Route path='/add' element= {<Form />}/>
        <Route path='/about' element= {<About/>} />
        <Route path='/detail/:id' element={<CardDetail/>} />
      </Routes>
      <hr />
      <Footer/>
      </>
  )
}

export default App

