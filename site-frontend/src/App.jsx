import {useState, useEffect} from 'react'
import {Route, Routes} from 'react-router-dom'
import axios from 'axios'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import Post from './pages/Post'
import Profile from './pages/Profile'

import Navbar from './components/Navbar'

function App() {

  const [loggedIn, setLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState({
    name:'',
    email:'',
    access:''
  })

  useEffect(()=>{
    console.log('login effect triggered');
    

    if(loggedIn){
      async function getLoggedinUser(){
        const token = localStorage.getItem('userAuthToken')
        const url = `http://localhost:7777/user?token=${token}`
        const response = await axios.get(url)
        if(response.status !== 200){
          console.error('Token failure');
          return null
        }
        else{
          const data = await response.data
          setCurrentUser(data)
        }
      }
      getLoggedinUser()
    }
  },[loggedIn])

  return (
    <div className="app">
      {loggedIn&&
        <div className="userDisplay">
          Welcome <b>{currentUser.name}</b> <i>({currentUser.email})</i>
        </div>
      }
      <Navbar loggedIn={loggedIn}/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login setLoggedIn={setLoggedIn}/>}/>
        <Route path='/post' element={<Post/>}/>
        <Route path='/profile' element={<Profile/>}/>
      </Routes>
    </div>
  )
}

export default App
