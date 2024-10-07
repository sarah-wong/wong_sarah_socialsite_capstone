import Feed from '../components/Feed'
import {useParams} from 'react-router-dom'

function Profile() {
  const {username} = useParams()
  return (
    <div className="page">
      <h2>@{String(username)}</h2>
      <div className="flexbox profileHeader">
        <img src="/vite.svg" alt="" className="profileImage" />
        <div className="cloutCounter">
          <p>1,000</p>
          <p>feed</p>
        </div>
        <div className="cloutCounter">
          <p>1,000</p>
          <p>Followers</p>
        </div>
        <div className="cloutCounter">
          <p>1,000</p>
          <p>Following</p>
        </div>
      </div>
      <p className="aboutMe">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam omnis ad quae vero, voluptate, sit non ut error nesciunt ratione asperiores, beatae distinctio amet exercitationem suscipit culpa iure rerum quas?</p>
      <div className="flexbox buttonTray">
        <button className="followBtn">Follow</button>
        <button>Message</button>
        <button>Contact</button>
      </div>
      <Feed filter={{username:username}}/>
    </div>
  )
}

export default Profile