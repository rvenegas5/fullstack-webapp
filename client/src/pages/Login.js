import React, { useState } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'

function Login() {
  let history = useHistory()

  const [username, setUserName] = useState("")
  const [password, setPassword] = useState("")

  const login = () => {
    const data = {username: username, password: password}
    axios.post("http://localhost:3001/auth/login", data).then((response)=>{
      if (response.data.error) {
        alert(response.data.error)
      } else {
        sessionStorage.setItem("accessToken", response.data) // Guardo el token en el sessionStorage si todo sale bien
        history.push("/")
      }
    })
  }

  return (
    <div className="loginContainer">
      <label> Username: </label>
      <input type="text" onChange={(event) => {setUserName(event.target.value)}} />
      <label> Password: </label>
      <input type="password" onChange={(event) => {setPassword(event.target.value)}} />

      <button type="submit" onClick={login}>Login</button>
    </div>

  )
}

export default Login
