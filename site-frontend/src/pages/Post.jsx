import {useState, useRef} from 'react'

function Post() {
  const [formData, setFormData] = useState({
    title:'',
    content:'',
    tags:[]
  })

  function handleAddTag(evt){
    evt.preventDefault()
    if(evt.key === 'Enter')
    {
      const newTag = String(evt.target.value).trim()
      evt.target.value = ''
      if(!formData.tags.includes(newTag)){
        setFormData({
          ...formData,
          tags:[...formData.tags, newTag]
        })
      }
     
    }
  }
  function removeTag(index){
    
  }

  return (
    <div className="page">
      <h1>New Post</h1>
      <form className="newPostForm">
          <input type="text" className="titleField" name="title" placeholder="Post Title"/>
          <textarea className="contentField" name="content" placeholder="Type something..."/>
          <input type="text" className="addTag" placeholder='add tags'onKeyUp={handleAddTag}/>
          <div className="tagContainer">
          {formData.tags.map((tag, idx)=>
            <span className="tag" key={tag}>
              #{tag} <button className="inlineBtn delete">X</button>
            </span>)}
          </div>
          <button type="submit">Create Post</button>
        </form>
    </div>
  )
}

export default Post