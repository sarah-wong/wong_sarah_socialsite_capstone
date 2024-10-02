import React from 'react'
import {Link} from 'react-router-dom'

function Navbar() {
  return (
    <nav className="navbar">
        <Link className="navtab" to='/'>Home</Link>
        <Link className="navtab" to='/login'>Login</Link>
        <Link className="navtab" to='/post'>New Post</Link>
        <Link className="navtab" to='/profile'>My Profile</Link>
    </nav>
  )
}

export default Navbar