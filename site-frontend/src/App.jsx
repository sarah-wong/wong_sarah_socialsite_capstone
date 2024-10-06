import {useState, useEffect, createContext} from 'react'
import {Route, Routes} from 'react-router-dom'
import axios from 'axios'
import './App.css'

import Home from './pages/Home'
import Login from './pages/Login'
import PostForm from './pages/PostForm'
import Profile from './pages/Profile'

import Navbar from './components/Navbar'

export const CurrentUserContext = createContext()

function App() {

  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('userAuthToken')!=null)
  const [currentUser, setCurrentUser] = useState({
    name:'',
    email:'',
    access:''
  })

  axios.defaults.baseURL = 'http://localhost:7777'

  // Retrieve user data from authToken
  useEffect(()=>{
    if(loggedIn){
      console.log('login effect triggered');
      async function getLoggedinUser(){
        const token = localStorage.getItem('userAuthToken')
        const url = `/user?token=${token}`
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
    else{
      console.log('logging out');
      localStorage.removeItem('userAuthToken')
      setCurrentUser({
        name:'',
        email:'',
        access:''
      })
    }
  },[loggedIn])

  function getPost(id){

  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {loggedIn&&
          <div className="userDisplay">
            <div className="welcomeMsg">
              Welcome <b>{currentUser.access!=='USER'&&`[${currentUser.access}]`}</b> {currentUser.name} <i>({currentUser.email}) </i>
            </div>
            <button onClick={()=>setLoggedIn(false)}>
              Log Out
            </button>
          </div>
        }
        <Navbar loggedIn={loggedIn}/>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={
            <Login loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          }/>
          <Route path='/post/new' element={<PostForm/>}/>
          <Route path='/post/:id' element={<PostForm/>}/>
          <Route path='/profile' element={<Profile/>}/>
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  )
}

export default App
