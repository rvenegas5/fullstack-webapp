import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'  // usar parametros en la url
import axios from 'axios'

function Post() {
  let {id} = useParams()
  const [postObject, setPostObject] = useState({})
  const [comments, setComments] = useState([])
  const [newComment, setNewComment] = useState("")

  useEffect( ()=> {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response)=>{
      setPostObject(response.data)
    })
    axios.get(`http://localhost:3001/comments/${id}`).then((response)=>{
      setComments(response.data)
    })
  }, [])

  const addComment = () => {
    axios.post("http://localhost:3001/comments", {commentBody: newComment, PostId: id}, {
      headers: {
        accessToken: sessionStorage.getItem("accessToken")
      }
    }
    ).then((response)=>{
      if (response.data.error) {
        alert("User doesn't logged")
      } else {
        const commentToAdded = {commentBody: newComment, username: response.data.username}
        setComments([...comments, commentToAdded]) // agrego el nuevo comentario a la lista de comentarios para que se renderizen todos los comentarios
        setNewComment("") // Limpio el input del nuevo comentario
      }
    })
  }
  return (
    <div className="postPage">
    <div className="leftSide">
      <div className="post" id="individual">
        <div className="title">{postObject.title}</div>
        <div className="body">{postObject.postText}</div>
        <div className="footer">{postObject.username}</div>
      </div>
    </div>
    <div className="rightSide">
      <div className="addCommentContainer">
        <input type="text" value={newComment} placeholder="Comment..." autoComplete="off" onChange={(event)=>{setNewComment(event.target.value)}} />
        <button type="submit" onClick={addComment}> Add comment</button>
      </div>
      <div className="listOfComments">
        {comments.map( (value, key) => {
          return <div className="comment">
              {value.commentBody}
              <label> Username: {value.username}</label>
            </div>
        })}
      </div>
    </div>

    </div>
  )
}

export default Post
