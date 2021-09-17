const express = require('express')
const router = express.Router()
const { Users } = require('../models')
const bcrypt = require('bcrypt')
const { sign } = require('jsonwebtoken')

// Para el registro de usuarios
router.post('/', async(req, res) => {
  const { username, password } = req.body
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash
    })
    res.send("Success")
  })
})

router.post('/login', async(req, res) => {
  const { username, password } = req.body
  const user = await Users.findOne({  // Busco el usuario con ese username
    where: { username: username }
  })
  // Compruebo que el usuario exista
  if (!user) res.json({error: "User doesn't exits"})

  // Verifico la password
  bcrypt.compare(password, user.password).then( (match) => {
    // Comparo las passwords
    if(!match) res.json({error: "Wrong Username And Password Combination"})

    const accessToken = sign({username: user.username, id:user.id}, "importansecret")
    res.json(accessToken)
  })
})
//router.post()

module.exports = router  // De esta forma puedo llmar a router desde otro file