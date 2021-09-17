// Esto me permite validar el token
const { verify } = require('jsonwebtoken')

const validateToken = (req, res, next) => {
  const accessToken = req.header("accessToken")

  if (!accessToken) return res.json({error: "User not logged in"})  // Compruebo si el usuario esta logeado con su token

  try{
    // Verifica que el token es valido con el string secreto
    const validToken = verify(accessToken, "importansecret")
    req.user = validToken
    if (validToken) {
      return next()
    }
  } catch (err) {
    return res.json({error: err})
  }

}

module.exports = { validateToken }