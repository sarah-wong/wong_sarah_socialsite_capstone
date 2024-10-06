import { useState, useContext } from 'react'
import { CurrentUserContext } from '../App'
import axios from 'axios'

function Post({post, idx, commentOnPost}) {

  const currentUser = useContext(CurrentUserContext)
  const [formData, setFormData] = useState({
    comment: ''
  })

  function handleFormChange(evt){
    setFormData({
      ...formData,
      [evt.target.name]:evt.target.value
    })
  }

  async function handleSubmitComment(evt){
    evt.preventDefault()
    const token = localStorage.getItem('userAuthToken')
    const url = `http://localhost:7777/post/${post._id}/comment?token=${token}`
    const comment = await axios.post(url, {
      text: formData.comment
    })
    commentOnPost(comment, idx)
    
  }

  
  return (
    <div className="post">
      <div className="flexbox userInfoBox">
        <img src="vite.svg" alt={post.username} className="pfp" />
        <b className='lefty'>@{post.username}</b>
        {currentUser._id === post.meta.userId&&
          <button className="inlineBtn">edit</button>}
      </div>
        <h3 className='postHeader'>{post.title}</h3>
        <p>{post.content}</p>
        <div className="tagContainer">
            {post.tags.map((tag)=>(
            <span className="tag" key={tag}>
                #{tag}
            </span>
            ))}
        </div>
        <form className="commentForm" onSubmit={handleSubmitComment}>
            <input type="text" name="comment" onChange={handleFormChange}/>
            <input type="submit" value="Comment" />
        </form>
        <hr />
        <div className="commentComtainer">
          {post.meta.comments.length?
            post.meta.comments.map(({text, username})=>(
              <div className="comment">
                <b>@{username}</b>
                <p>{text}</p>
              </div>
            )):
            <i>no comments yet...</i>
          }
        </div>
    </div>
  )
}

export default Post