const {
    VerifyToken
} = require("../lib/hash")

const auth = (User) => async (req, res, next) => {
    try {
        // check header, ada token atau tidak

        const token = req.headers["authorization"]

        if (!token) {
            throw {
                code: 401
            }
        }

        // verify token
        const decode = VerifyToken(token.slice(7))

        const user = await User.getUserById(decode.id);

        if (!user) {
            throw {
                code: 401
            }
        }

        req.user = {
            id: user.id,
            email: user.email,
            username: user.username
        }

        next()

    } catch (error) {
        res.status(error.code || 500).json({message: "Unauthorized"})
    }
}


module.exports = {
    auth
}