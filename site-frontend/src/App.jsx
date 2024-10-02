import { useState } from 'react'
import {Route, Routes} from 'react-router-dom'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Profile from './pages/Profile'

import Navbar from './components/Navbar'

function App() {

  return (
    <div className="app">
      <Navbar/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App
