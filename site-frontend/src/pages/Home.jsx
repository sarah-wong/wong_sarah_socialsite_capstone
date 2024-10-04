import {useState, useEffect, useContext} from 'react'
import axios from 'axios'
import Post from '../components/Post'

function Home() {
  const [feed, setFeed] = useState([])

  useEffect(()=>{
    async function getPostFeed(){
      const response = await axios.get('http://localhost:7777/post')
      if(response.status !== 200){
        console.error('Error retrieving posts');
        console.log(response.statusText);
      }
      const posts = await response.data.posts
      setFeed(posts)
    }
    getPostFeed()
  },[])


  return (
    <div className="page">
      <h1>Home</h1>
      <div className="feed">
        {feed.map((post)=>(
          <Post post={post} current/>
          ))}
      </div>
    </div>
  )
}

export default Home