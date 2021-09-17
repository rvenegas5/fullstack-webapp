import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik' // Permite validar formularios por mi
import * as Yup from 'yup'
import axios from "axios"
import { useHistory } from 'react-router-dom' // Historial de URLs que he manejado

function CreatePost() {
  let history = useHistory()
  // Crear los valores iniciales como un objeto y se lo paso como arg a Formik
  const initialValues = {
    title:"",
    postText:"",
    username:""
  }

  // Esta variable me permite validar los datos de los inputs
  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a title"),
    postText: Yup.string().required("You must input a Text from the post"),
    username: Yup.string().min(3).max(15).required()
  })
  // Funcion que se va a ejecutar cuando se envie el formulario, Formik le pasa la data automaticamente
  const onSubmit = (data) => {
    axios.post("http://localhost:3001/posts", data).then((response)=>{
      history.push("/")
    })
  }

  return (
    <div className="createPostPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span"/>
          <Field autocomplete="off" id="inputCreatePost" name="title" placeholder="(Ex. Title...)" />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span"/>
          <Field autocomplete="off" id="inputCreatePost" name="postText" placeholder="(Ex. Text...)" />
          <label>Username: </label>
          <ErrorMessage name="username" component="span"/>
          <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="(Ex. rvenegas...)" />

          <button type="submit">Create Post</button>
        </Form>
      </Formik>
    </div>
  )
}

export default CreatePost