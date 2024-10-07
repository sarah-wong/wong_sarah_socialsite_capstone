import {useState, useEffect, useContext} from 'react'
import Feed from '../components/Feed'
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { CurrentUserContext } from '../App'

function Profile() {
  const currentUser = useContext(CurrentUserContext)
  const {username} = useParams()
  // console.log(`profile of: ${username}`);
  const [profileData, setProfileData] = useState(null)

  useEffect(()=>{
    (async function getProfileData(){
      const url = `/profile/${username}`
      const response = await axios.get(url)
      const profile = await response.data.profile;
      const followerCount = profile.meta.followerProfiles.length
      const followingCount = profile.meta.followingProfiles.length

      const userPosts = await axios.get(`/post?user=${String(username)}`)
      const postCount = await userPosts.data.posts.length

      profile.posts = postCount
      profile.followers = followerCount
      profile.following = followingCount
      

      setProfileData(profile)
    })()
  },[])

  function loading(){
    return <i>Loading...</i>
  }

  function loaded(){
    return (
      <div className="page">
        <div className="flexbox pageHeader">
          <h2>@{String(username)}</h2>
          {(currentUser._id===profileData.meta.userId)&&
            <button className="iconBtn edit"></button>}
        </div>
      <div className="profileHeader">
        <section className="flexbox profileStats">
          <img src="/vite.svg" alt="" className="profileImage" />
          <div className="cloutCounters">
            <p>{profileData.posts}</p>
            <p className='counterLabel'>Posts</p>
          </div>
          <div className="cloutCounter">
            <p>{profileData.followers}</p>
            <p className='counterLabel'>Followers</p>
          </div>
          <div className="cloutCounter">
            <p>{profileData.following}</p>
            <p className='counterLabel'>Following</p>
          </div>
        </section>
        <section className="profileInfo">
          <h3 className='profileName'>{profileData.displayName}</h3>
          <i className="status"><b>Status:</b> {profileData.status}</i>
          <p className="bio">{profileData.bio}</p>
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

  return profileData?loaded():loading()
}

export default Profile