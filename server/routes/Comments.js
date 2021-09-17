const express = require('express')
const router = express.Router()
const { Comments } = require('../models')
const { validateToken } = require('../middlewares/AuthMiddleware')

// Obtener todos los comentarios de un post
router.get('/:postId', async(req, res) => {
  const postId = req.params.postId  //obtengo los parametros de la url con params
  const comments = await Comments.findAll({ //obtengo los datos con la condicion anterior
    where: {PostId: postId}
  })
  res.json(comments)
})

router.post('/', validateToken, async(req, res) => {
  const comment = req.body
  const username = req.user.username
  comment.username = username
  console.log(comment)
  await Comments.create(comment)
  res.json(comment)
})
module.exports = router 