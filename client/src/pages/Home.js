import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import { useHistory } from 'react-router-dom' // Historial de URLs que he manejado

function Home() {
  const [listOfPosts, setListOfPosts] = useState([])

  useEffect( ()=> {
    axios.get("http://localhost:3001/posts").then((response)=>{
      setListOfPosts(response.data)
    })
  }, [])

  let history = useHistory()
  return (
    <div>
      { listOfPosts.map( (value, key) => {
        return <div className="post" onClick={()=> {history.push(`/post/${value.id}`)}}>
          <div className="title">{value.title}</div>
          <div className="body">{value.postText}</div>
          <div className="footer">{value.username}</div>
        </div>
      })}
    </div>
  )
}

export default Home
