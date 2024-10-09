import React from 'react'
import {Link} from 'react-router-dom'

function NewPostBtn() {
  return (
    <button className='newPostBtn' >
        <Link to='/post/new' className='navlink'>
            <img className="iconBtn fullBtn add"></img>
        </Link>
    </button>
  )
}

export default NewPostBtn