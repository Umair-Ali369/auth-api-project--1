const jwt = require('jsonwebtoken')
const User = require('../models/UserModel')

const protect = async (req, res, next) => {
    let token;

    //Check Token in header
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        try {
             //get token
             token = req.headers.authorization.split(" ")[1];
             //verify token 
             const decode = jwt.verify(token, process.env.JWT_SECRET)
             //find user by id
             const user = await User.findById(decode.id).select('-password');
             //continue
             req.user = decode.id
             return next()
        } catch(err) {

           return res.status(401).json({message : "Not authorized, token failed", err})

        }
    }

    //no token 
    return res.status(401).josn({message : "No token, authorization denied"})
}

module.exports = protect