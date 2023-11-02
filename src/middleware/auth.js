const {
    verifyToken
  } = require("../lib/hash")
  
  const {
    User
  } = require("../domain/user")

const auth = async(req, res, next) => {
    try {
        // check header, ada token atau tidak
    
        const token = req.headers["authorization"]
    
        if (!token) {
          throw {
            code: 401,
            message: "Unauthorized"
          }
        }
    
        // verify token
        const decode = verifyToken(token)
    
        const user = await User.findOne({
          where: {
            id: decode.id,
            email: decode.email
          }
        })
    
        if (!user) {
          throw {
            code: 401,
            message: "User not found"
          }
        }
    
        req.user = {
          id: user.id,
          email: user.email,
          username: user.username
        }
    
        next()
    
      } catch (error) {
        res.status(error.code || 500).json(error.message)
      }
}


module.exports = {
    auth
  }