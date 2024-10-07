import {useState, useEffect} from 'react'
import axios from 'axios'
import Post from './Post'

function Feed({filter}) {
    const [feed, setFeed] = useState([])

    useEffect(()=>{
      (async function getFeedPosts(){
        let url = '/post'
        if(filter){
            url += '?'
            url += filter.title?`title=${filter.title}`:''
            url += filter.user?`title=${filter.user}`:''
            url += filter.tags?`tags=${filter.tags}`:''
            url += filter.after?`after=${filter.after}`:''
            url += filter.before?`before=${filter.before}`:''
            url += filter.limit?`limit=${filter.limit}`:''
        }
        const response = await axios.get(url)
        if(response.status !== 200){
          console.error('Error retrieving posts');
          console.log(response.statusText);
        }
        const posts = await response.data.posts
        setFeed(posts)
      })()
    },[])
  
    function setPost(idx, post){
      setFeed((feed)=>{
        feed.splice(idx, 1, post)
        return feed
      })
    }

  return (
    <div className="feed">
        {feed.map((post, idx)=>(
          <Post
          key={post._id}
          post={post}
          setPost={(post)=>setPost(idx, post)}/>
          ))}
      </div>
  )
}

export default Feed