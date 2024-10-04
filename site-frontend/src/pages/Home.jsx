import {useState, useEffect} from 'react'
import axios from 'axios'

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
          <div className="post">
            <h3>@{post.username} &mdash; {post.title}</h3>
            <p>{post.content}</p>
            <div className="tagContainer">
              {post.tags.map((tag)=>(
                <span className="tag" key={tag}>
                  #{tag}
                </span>
              ))}
            </div>
          </div>
          ))}
      </div>
    </div>
  )
}

export default Home