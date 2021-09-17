const express = require('express')
const router = express.Router()
const { Posts } = require('../models')

router.get('/', async (req, res) => {  // Solo incluyo el "/" porque la ruta es /posts
  try {
    const listOfPosts = await Posts.findAll()
    res.send(listOfPosts)
  } catch (err) {
    console.log(err)
  }
})

router.get('/byId/:id', async(req, res) => {
  const id = req.params.id  //obtengo los parametros de la url con params
  const post = await Posts.findByPk(id)
  res.json(post)
})

router.post('/', async(req, res) => {
  try {
    const post = req.body  // Obtengo el cuerpo de la data que me envian con body
    await Posts.create(post)  // sequelize inserta los datos de post en la tabla Posts de la db 
    res.json(post)
  } catch (err) {
    console.log(err)
  }

})


//router.post()

module.exports = router  // De esta forma puedo llmar a router desde otro file