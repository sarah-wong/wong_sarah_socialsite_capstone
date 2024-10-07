import Feed from '../components/Feed'
import {useParams} from 'react-router-dom'

function Profile() {
  const {username} = useParams()
  // console.log(`profile of: ${username}`);
  return (
    <div className="page">
      <h2>@{String(username)}</h2>
      <div className="profileHeader">
        <section className="flexbox profileStats">
          <img src="/vite.svg" alt="" className="profileImage" />
          <div className="cloutCounters">
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
        </section>
        <section className="profileInfo">
          <h3 className='profileName'>Site Admin Account</h3>
          <i className="status"><b>Status:</b> Doing Great :)</i>
          <p className="bio">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aperiam omnis ad quae vero, voluptate, sit non ut error nesciunt ratione asperiores, beatae distinctio amet exercitationem suscipit culpa iure rerum quas?</p>
        </section>
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