import jwt from 'jsonwebtoken'

const authValidation = (req, res, next) => {
  try {
    const token = req.cookies.token
    if (!token) {
      return res.status(401).json({
        success: false,
        msg: 'Unauthorized',
      })
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET_KEY)
    req.body.userId = decodedData.userId
    return next()
  } catch (error) {
    return res.status(500).json({
      success: false,
      errors: error,
    })
  }
}

export default authValidation
