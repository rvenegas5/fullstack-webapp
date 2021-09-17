import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik' // Permite validar formularios por mi
import * as Yup from 'yup'
import axios from 'axios'


function Registration() {

  const initialValues = {
    username:"",
    password:"",
  }

  // Esta variable me permite validar los datos de los inputs
  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(6).max(20).required()
  })

  const onSubmit = (data) => {
    axios.post("http://localhost:3001/auth", data).then((response)=>{
      console.log(response)
    })
  }

  return (
    <div className="createPostPage">
      <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
        <Form className="formContainer">
          <label>Username: </label>
          <ErrorMessage name="username" component="span"/>
          <Field autocomplete="off" id="inputCreatePost" name="username" placeholder="(Ex. rvenegas...)" />

          <label>Password: </label>
          <ErrorMessage name="password" component="span"/>
          <Field autocomplete="off" id="inputCreatePost" type="password" name="password" placeholder="(Ex. rvenegas123...)" />

          <button type="submit">Register</button>
        </Form>
      </Formik>
    </div>
  )
}

export default Registration
