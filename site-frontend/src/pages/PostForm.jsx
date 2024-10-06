import {useState, useContext, useEffect} from 'react'
import axios from 'axios'
import {CurrentUserContext} from '../App'
import {useParams, useNavigate} from 'react-router-dom'

function PostForm() {
  const currentUser = useContext(CurrentUserContext)
  const {id} = useParams()
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    username: currentUser.name,
    tags:[]
  })

  const navigate = useNavigate()
  

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
  async function handleSubmitPost(evt){
    evt.preventDefault()
    const token = localStorage.getItem('userAuthToken')
    if(!id){
      const url = `/post?token=${token}`
      const response = await axios.post(url, formData)
      setFormData({
        title:'',
        content:'',
        username: currentUser.name,
        tags:[]
      })
      if(response.status !== 201){
        console.error('Something when wrong with post creation');
        console.log(response.statusText);
      }
    }
    else{
      const url = `/post/${id}?token=${token}`
      const response = await axios.put(url, formData)
      setFormData({
        title:'',
        content:'',
        username: currentUser.name,
        tags:[]
      })
      if(response.status !== 201){
        console.error('Something when wrong with post editting');
        console.log(response.statusText);
      }
    }
    navigate('/')
  }

  useEffect(()=>{
    console.log(`id:${id}`);
    (async function checkForExistingPost(){
      if(id){
        const response = await axios.get(`/post/${id}`);
        const post = await response.data.post;
        setFormData({
          title: post.title,
          content: post.content,
          username: currentUser.name,
          tags: post.tags
        })
      }
    })()
  },[])

  return (
    <div className="page">
      <h1>{id?'Edit':'New'} Post</h1>
      <form className="newPostForm" onSubmit={handleSubmitPost}>
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
          <button type="submit">{id?'Edit':'Create'}</button>
        </form>
    </div>
  )
}

export default PostForm