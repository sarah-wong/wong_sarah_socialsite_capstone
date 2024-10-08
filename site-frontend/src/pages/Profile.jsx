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
  const [showForm, setShowForm] = useState(false)

  useEffect(()=>{
    (async function getProfileData(){
      const url = `/profile/${username}`
      const response = await axios.get(url)
      const profile = await response.data.profile;

      const userPosts = await axios.get(`/post?user=${String(username)}`)
      profile.postCount = await userPosts.data.posts.length

      setProfileData(profile)
    })()
  },[])

  function handleChange(evt){
    evt.preventDefault()
    setProfileData({
      ...profileData,
      [evt.target.name]:evt.target.value
    })
  }
  async function handleUpdateProfile(evt){
    evt.preventDefault()
    const token = localStorage.getItem('userAuthToken')
    const url = `/profile?token=${token}`
    const response = await axios.put(url, {
      displayName:profileData.displayName,
      status:profileData.status,
      bio:profileData.bio
    })
    const updatedData = await response.data.profile
    setProfileData({
      ...profileData,
      ...updatedData
    })
    setShowForm(false)
  }

  function loading(){
    return <i>Loading...</i>
  }

  function loaded(){
    return (
      <div className="page">
      <h2>@{String(username)}</h2>
      {!showForm?<div className="profileHeader">
        <section className="flexbox profileStats">
          <img src="/vite.svg" alt="" className="profileImage" />
          <div className="cloutCounter">
            <p>{profileData.postCount}</p>
            <p className='counterLabel'>Posts</p>
          </div>
          <div className="cloutCounter">
            <p>{profileData.meta.followerProfiles.length}</p>
            <p className='counterLabel'>Followers</p>
          </div>
          <div className="cloutCounter">
            <p>{profileData.meta.followingProfiles.length}</p>
            <p className='counterLabel'>Following</p>
          </div>
        </section>
        <section className="profileInfo">
          <h3 className='profileName'>{profileData.displayName}</h3>
          <i className="status"><b>Status:</b> {profileData.status||'no status yet...'}</i>
          <p className="bio">{profileData.bio||'no bio yet...'}</p>
        </section>
        <div className="flexbox buttonTray">
          <button className="followBtn">Follow</button>
          <button>Message</button>
          <button>Contact</button>
          {currentUser.name===username&&
          <button className="iconBtn edit" onClick={()=>setShowForm(true)}></button>}
        </div>
      </div>:
      <form className="profileForm" onSubmit={handleUpdateProfile}>
        <input type="text" name='displayName' value={profileData.displayName} onChange={handleChange}/>
        <input type="text" name='status' value={profileData.status}  onChange={handleChange} placeholder='status...'/>
        <textarea name="bio" value={profileData.bio} onChange={handleChange} placeholder='bio...'>
        </textarea>
        <div className="buttonTray">
          <button type="submit">Save Changes</button>
          <button onClick={()=>setShowForm(false)}>
            Cancel
          </button>
        </div>
      </form>
      }
      <Feed filter={{user:username}}/>
    </div>
    )
  }

  return profileData?loaded():loading()
}

export default Profile