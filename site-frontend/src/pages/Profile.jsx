import {useState, useEffect, useContext} from 'react'
import {CurrentUserContext} from '../App'
import Post from '../components/Post'
import axios from 'axios'

function Profile() {
  const currentUser = useContext(CurrentUserContext)
  const [feed, setFeed] = useState([])

  useEffect(()=>{
    (async function getProfilefeed(){
      const username = String(currentUser.name)
      //username MUST to be typecast or console-logged to work. for some reason
      const url = `/post?user=${username}`
      const response = await axios.get(url)
      const data = await response.data
      setFeed(data.posts)
      console.log(`feed: ${feed}`);
    })()
    
  },[])

  function setPost(idx, post){
    setFeed((feed)=>{
      feed.splice(idx, 1, post)
      return feed
    })
  }

  return (
    <div className="page">
      <h2>@{currentUser.name}</h2>
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
      {feed?<div className="feed">
        {feed.map((post, idx)=>(
          <Post key={post._id} post={post} setPost={(post)=>setPost(idx, post)}/>
          ))}
      </div>:
      <i>@{currentUser.name} hasn't posted anything yet...</i>}
    </div>
  )
}

export default Profile