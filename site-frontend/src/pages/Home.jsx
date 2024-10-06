import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import Post from '../components/Post'

function Home() {
  const [feed, setFeed] = useState([])

  useEffect(()=>{
    async function getPostFeed(){
      const response = await axios.get('/post')
      if(response.status !== 200){
        console.error('Error retrieving posts');
        console.log(response.statusText);
      }
      const posts = await response.data.posts
      setFeed(posts)
    }
    getPostFeed()
  },[])

  function setPost(idx, post){
    setFeed((feed)=>{
      feed.splice(idx, 1, post)
      return feed
    })
  }

  return (
    <div className="page">
      <h1>Home</h1>
      <div className="feed">
        {feed.map((post, idx)=>(
          <Post key={post._id} post={post} setPost={(post)=>setPost(idx, post)}/>
          ))}
      </div>
    </div>
  )
}

export default Home