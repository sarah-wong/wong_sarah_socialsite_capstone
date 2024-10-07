import Feed from '../components/Feed'
import {useParams} from 'react-router-dom'

function Profile() {
  const {username} = useParams()
  // console.log(`profile of: ${username}`);
  return (
    <div className="page">
      <div className="profileHeader">
        <h2>@{String(username)}</h2>
        <div className="flexbox profileInfo">
          <img src="/vite.svg" alt="" className="profileImage" />
          <div className="cloutCounter">
            <p>1,000</p>
            <p className='counterLabel'>Posts</p>
          </div>
          <div className="cloutCounter">
            <p>1,000</p>
            <p className='counterLabel'>Followers</p>
          </div>
          <div className="cloutCounter">
            <p>1,000</p>
            <p className='counterLabel'>Following</p>
          </div>
        </div>
        <h3 className='profileName'>Site Admin</h3>
        <p className="aboutMe">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam omnis ad quae vero, voluptate, sit non ut error nesciunt ratione asperiores, beatae distinctio amet exercitationem suscipit culpa iure rerum quas?</p>
        <div className="flexbox buttonTray">
          <button className="followBtn">Follow</button>
          <button>Message</button>
          <button>Contact</button>
        </div>
      </div>
      <Feed filter={{user:username}}/>
    </div>
  )
}

export default Profile