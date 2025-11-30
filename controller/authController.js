const  User  = require('../models/UserModel')
const bcrypt = require('bcryptjs')
const generateToken = require('../utils/genereateToken')

//REGISTE USER
exports.registerUser = async (req, res) => {
    try {
        const { name , email , password } = req.body

        // All fields are requried
        if(!name || !email || !password) {
            return res.status(400).json(
                {message : "All field are required"}
            )
        }

        //Check user already exist or not
        const isExist = await User.findOne({email})
        if(isExist) return res.status(400).json({message : "Email already Registered"})

        // Hash password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        // Create new user 
        const newUser = await User.create({
           name, 
           email,
           password : hashPassword
        })


           //Send success response
        res.status(201).json(
            {
                message : "User successfully Registered",
                User : {
                    id : newUser._id,
                    name : newUser.name,
                    email : newUser.email
                },
          
            }
        )

    } catch (err) {

        res.status(500).json({message : err.message})

    }
}

//LOGIN USER 
exports.loginUser = async (req, res) => {
    try {
        const { email , password } = req.body
        
        //Check Input
        if( !email || !password ) return res.status(400).json({message : "Email & Password Required"})
            
        // Check User
        const user = await User.findOne({email})
        if(!user) return res.status(400).json({message : "Invalid Credential"})
        
        // Compare Password
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch) return res.status(400).json({message : "Invalid Password"})

        // generate token 
        const token = generateToken(user._id)

        // return successful respone
        res.status(200).json({
            message : "Login Successfull",
            user : {
                id : user._id,
                name : user.name,
                email : user.email,

            },
            token,
        })
        
    } catch (err) {

        res.status(500).json({mesage : "Login Server Error", err})

    }
}

//GET PROFILE
exports.getProfile = async (req, res) => {
    try {

        const user = await User.findById(req.user).select('-password')
        if(!user) {
            res.status(404).json({
                message : "User NOt Fount"
            })
        }
        res.status(201).json({
            message : "User profile fetch successfully",
            user
        })

    } catch (err) {

    }
}