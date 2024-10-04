import {useState} from 'react'
import axios from 'axios'
import {Navigate} from 'react-router-dom'

// axios.defaults.baseURL = 'http://localhost:777'

function Login({loggedIn, setLoggedIn}) {
  const [loginData, setLoginData] = useState({
    email:'',
    password:'',
    remember:false
  })

  const [signupData, setSignupData] = useState({
    name:'',
    email:'',
    password:'',
    confirm:''
  })

  const [formError, setFormError] = useState('')

  function handleLoginCheckbox(evt){
    setLoginData({
      ...loginData,
      [evt.target.name]:evt.target.checked
    })
  }
  function handleLoginFieldChange(evt){
    setLoginData({
      ...loginData,
      [evt.target.name]:evt.target.value
    })
  }
  function handleSignupFieldChange(evt){
    setSignupData({
      ...signupData,
      [evt.target.name]:evt.target.value
    })
  }

  async function handleLogin(evt){
    evt.preventDefault()
    setFormError('')
    const response = await axios.post('http://localhost:7777/user/login',{
      email: loginData.email,
      password: loginData.password
    })

    setLoginData({
      ...loginData,
      email:'',
      password:''
    })

    if(response.status !== 200){
      setFormError(
        'Login Failed! No account linked to that email and password...'
      )
      console.log(response.statusText);
    }
    else{
      const token = response.data
      localStorage.setItem('userAuthToken', token)
      console.log(`userAuthToken: ${token}`);
      setLoggedIn(true)
    }
    
    
  }
  async function handleSignup(evt){
    evt.preventDefault()
    setFormError('')

    const response = await axios.post('http://localhost:7777/user', signupData)

    setSignupData({
      name:'',
      email:'',
      password:'',
      confirm:''
    })

    if(response.status !== 201){
      setFormError('Registration Failed!')
      console.log(response.statusText);
    }
    else{
      const token = response.data
      localStorage.setItem('userAuthToken', token)
      console.log(`userAuthToken: ${token}`);
      setLoggedIn(true)
    }

    
  }

  return (
    <div className="page">
      {loggedIn&& <Navigate to='/' replace={true}/>}
      <h1>Login Page</h1>
      <div className="formContainer">
        <form action="" className="loginForm" onSubmit={handleLogin}>
          <h3>Sign In</h3>
          <input type="email" name="email" placeholder='email' required
          value={loginData.email}
          onChange={handleLoginFieldChange}/>
          <input type="password" name="password" placeholder='password' required
          value={loginData.password}
          onChange={handleLoginFieldChange}/>
          <div className="optionBox">
            <input type="checkbox" name="remember"
            checked={loginData.remember}
            onChange={handleLoginCheckbox}/>
            <label htmlFor="remember"> remember me</label>
          </div>
          <br />
          <button type="submit">Login</button>
        </form>
        <form action="" className="signupForm" onSubmit={handleSignup}>
          <h3>Register</h3>
          <input type="text" name="name" placeholder='username' required
          onChange={handleSignupFieldChange}
          value={signupData.name}/>
          <input type="email" name="email" placeholder='email' required
          onChange={handleSignupFieldChange}
          value={signupData.email}/>
          <input type="password" name="password" placeholder='password' required
          onChange={handleSignupFieldChange}
          value={signupData.password}/>
          <input type="password" name="confirm" placeholder='confirm password' required
          onChange={handleSignupFieldChange}
          value={signupData.confirm}/>
          <br />
          <button type="submit">Sign Up</button>
        </form>
      </div>
      <div className="formError">
        {formError}
      </div>
    </div>
  )
}

export default Login