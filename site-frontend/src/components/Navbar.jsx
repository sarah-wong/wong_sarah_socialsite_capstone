import React from 'react'
import {Link} from 'react-router-dom'

function Navbar({loggedIn}) {
  return (
    <nav className="navbar">
        <Link className="navtab" to='/'>Home</Link>
        {!loggedIn&&<Link className="navtab" to='/login'>Login/Register</Link>}
        {loggedIn&&<Link className="navtab" to='/post'>New Post</Link>}
        {loggedIn&&<Link className="navtab" to='/profile'>My Profile</Link>}
    </nav>
  )
}

export default Navbar