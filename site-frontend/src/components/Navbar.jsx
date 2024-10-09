import {useContext} from 'react'
import {Link} from 'react-router-dom'
import { CurrentUserContext } from '../App'

function Navbar({loggedIn}) {
  const currentUser = useContext(CurrentUserContext)
  const myProfile = `/profile/${currentUser.name}`
  return (
    <nav className="navbar">
        <Link className="navtab" to='/'>Home</Link>
        {!loggedIn&&<Link className="navtab" to='/login'>Sign Up/Login</Link>}
        {loggedIn&&<Link className="navtab" to={myProfile}>My Profile</Link>}
    </nav>
  )
}

export default Navbar