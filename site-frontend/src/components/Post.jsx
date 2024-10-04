import React from 'react'

function Post({post}) {
  return (
    <div className="post">
        <h3 className='postHeader'>@{post.username} &mdash; {post.title}</h3>
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