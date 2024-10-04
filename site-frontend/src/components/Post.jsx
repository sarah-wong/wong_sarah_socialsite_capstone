import { useContext } from 'react'

import { CurrentUserContext } from '../App'

function Post({post}) {
  const currentUser = useContext(CurrentUserContext)
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
    </div>
  )
}

export default Post