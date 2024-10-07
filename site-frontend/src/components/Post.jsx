import { useState, useEffect, useContext } from 'react'
import { CurrentUserContext } from '../App'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'

function Post({post, setPost}) {

  const currentUser = useContext(CurrentUserContext)
  const token = localStorage.getItem('userAuthToken')
  const [vote, setVote] = useState(0)
  const [commentFormData, setCommentFormData] = useState({
    comment: ''
  })
  const [displayComments, setDisplayComments] = useState(false)
  const navigate = useNavigate()

  function handleCommentFormChange(evt){
    setCommentFormData({
      ...commentFormData,
      [evt.target.name]:evt.target.value
    })
  }

  async function handleSubmitComment(evt){
    evt.preventDefault()
    
    const url = `/post/${post._id}/comment?token=${token}`
    const response = await axios.post(url, {
      text: commentFormData.comment
    })
    setPost(response.post)
    
  }

  async function handleVote(evt){
    evt.preventDefault()
    let value = Number(evt.target.value)
    // clicking the button again undoes the vote
    if(value===vote){
      value=0
    }

    const url = `/post/${post._id}/vote?token=${token}`
    await axios.put(url, {
      vote:value
    })
    setVote(value)
  }
  
  function handleDisplayToggle(evt){
    evt.preventDefault()
    setDisplayComments(!displayComments)
  }

  function checkVote(){
    const userId = currentUser._id
    const votes = post.meta.votes
    setVote(votes[userId]? votes[userId]:0)
  }
  useEffect(checkVote, [])

  function formatDate(createdAt){
    const date = new Date(createdAt)
    const dateStr = date.toLocaleTimeString('en-US',{
      hour:'numeric',
      minute:'numeric',
      month: 'short',
      day:'numeric',
      year:'numeric'
    })
    return dateStr
  }

  function goToEditForm(){
    navigate(`/post/${post._id}/edit`)
  }
  
  return (
    <div className="post">
      <div className="flexbox userInfoBox">
        <img src="/vite.svg" alt={post.username} className="pfp" />
        <b className='lefty'>@{post.username}</b>
        <i className="date">
          {formatDate(post.createdAt)}
        </i>
        {currentUser._id === post.meta.userId&&
          <button className="iconBtn edit" alt="edit" onClick={goToEditForm}>
            </button>
            }
      </div>
      <div className="postContent">
      <h3 className='postHeader'>{post.title}</h3>
        <p>{post.content}</p>
        <div className="tagContainer">
            {post.tags.map((tag)=>(
            <span className="tag" key={tag}>
                #{tag}
            </span>
            ))}
        </div>
      </div>
        <div className="voteBtnContainer">
          <button className={"iconBtn " + (vote===1?"likeSelect":"like")}
          value={1} onClick={handleVote}>

          </button>
          <button className={"iconBtn " + (vote===-1?"dislikeSelect":"dislike")}
          value={-1} onClick={handleVote}>

          </button>
        </div>
        <form className="commentForm" onSubmit={handleSubmitComment}>
            <input type="text" name="comment" onChange={handleCommentFormChange}/>
            <input type="submit" value="Comment" />
        </form>
        <button className='compoundBtn' onClick={handleDisplayToggle}>
          {displayComments?
            <img alt="V" className="iconBtn menu-down" />:
            <img alt="->" className="iconBtn menu-right" />
          }
          <span>
            {displayComments?
            'Hide Comments':
            `Show Comments (${post.meta.comments.length})`
            }
          </span>
        </button>
        {displayComments&&<div className="commentContainer">
          {post.meta.comments.length?
            post.meta.comments.map(({text, username, createdAt})=>
                 (<div className="comment">
                  <div className="flexbox userInfoBox">
                    <img src="/vite.svg" alt={username} className="pfp" />
                    <b className='lefty'>@{username}</b>
                    <i className="date">
                      {formatDate(createdAt)}
                    </i>
                    {currentUser._id === post.meta.userId&&
                      <button className="iconBtn edit" alt="edit"></button>
                        }
                  </div>
                  <p>{text}</p>
                </div>
                )):
            <i>no comments yet...</i>
          }
        </div>}
    </div>
  )
}

export default Post