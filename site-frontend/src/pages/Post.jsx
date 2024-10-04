import {useState, useRef} from 'react'
import axios from 'axios'

function Post({currentUser}) {
  const [formData, setFormData] = useState({
    title:'',
    content:'',
    username: currentUser.name,
    tags:[]
  })

  function handleFormChange(evt){
    setFormData({
      ...formData,
      [evt.target.name]:evt.target.value
    })
  }
  function blockSubmit(evt){
    if(evt.key === 'Enter'){
      evt.preventDefault()
    }
  }
  function handleAddTag(evt){
    
    if(evt.key === 'Enter')
    {
      evt.preventDefault()
      const newTag = evt.target.value
      evt.target.value = ''

      const updatedTags = [...formData.tags, newTag]
      setFormData({
        ...formData,
        tags: updatedTags
      })

     
    }
  }
  function removeTag(index){
    const start = formData.tags.slice(0,index)
    const end = formData.tags.slice(index+1)
    setFormData({
      ...formData,
      tags: [...start, ...end]
    })
  }
  function handleCreatePost(evt){
    evt.preventDefault()
    const token = localStorage.getItem('userAuthToken')
    const url = `http://localhost:7777/post?token=${token}`
    const response = axios.post(url, formData)
    setFormData({
      title:'',
      content:'',
      username: currentUser.name,
      tags:[]
    })
    if(response.status !== 201){
      console.error('Something when wrong with posting');
      console.log(response.statusText);
    }
  }

  return (
    <div className="page">
      <h1>New Post</h1>
      <form className="newPostForm" onSubmit={handleCreatePost}>
          <h3>@{formData.username}</h3>
          <input type="text" className="titleField" name="title" placeholder="Post Title" value={formData.title} onChange={handleFormChange}/>
          <textarea className="contentField" name="content" placeholder="Type something..." value={formData.content} onChange={handleFormChange}/>
          <input type="text" placeholder="Add tags... (optional)" onKeyUp={handleAddTag} onKeyDown={blockSubmit} name='ignore'/>
          <div className="tagContainer">
            {formData.tags.map((tag, idx)=>(
              <span className="tag" key={tag}>
                #{tag} <button className="inlineBtn"
                onClick={()=>removeTag(idx)}>X</button>
              </span>
            ))}
          </div>
          <button type="submit">Create Post</button>
        </form>
    </div>
  )
}

export default Post