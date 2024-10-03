import {useState} from 'react'
import axios from 'axios'

// axios.defaults.baseURL = 'http://localhost:777'

function Login() {
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

    if(response.status !== 200){
      setFormError(
        'Login Failed! No account linked to that email and password...'
      )
    }
    else{
      const token = response.data
      localStorage.setItem('userAuthToken', token)
      console.log(token);
    }
    
    setLoginData({
      ...loginData,
      email:'',
      password:''
    })
  }
  async function handleSignup(evt){
    evt.preventDefault()
    setFormError('')

    const response = await axios.post('http://localhost:7777/user/', signupData)

    if(response.status !== 200){
      setFormError('Registration Failed!')
    }
    else{
      const token = response.data
      console.log(token);
      localStorage.setItem('userAuthToken', token)
    }

    setSignupData({
      name:'',
      email:'',
      password:'',
      confirm:''
    })
  }

  return (
    <div className="page">
      <h1>Join Us, Thrive</h1>
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