const jwt = require("jsonwebtoken")




const userModel = require("../models/user.model")
const bcrypt = require("bcrypt")

const tokenBlacklistModel = require("../models/blacklist.model")


/**
 * @name registerUserController 
 * @description register a new user, expects username, email and password in the required body of the request. It will check if the user already exists with the same email or username, if not it will create a new user and return the user data in the response.
 * @access Public
 */

async function registerUserController(req, res){
  const { username, email, password} = req.body
  if(!username || !email || !password){
    return res.status(400).json({
        success: false,
        message: "All fields are required"
    })
  }

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ username }, { email }]
  })

  if(isUserAlreadyExists){
    if(isUserAlreadyExists.username == username){
        return res.status(400).json({
            success: false,
            message: "User with this username already exists"
        })
    }
    // Username didn't match, so it must be email conflict
    return res.status(400).json({
        success: false,
        message: "User with this email already exists"
    })
   }
   const hash= await bcrypt.hash(password, 10)
   const user = await userModel.create({
    username, email,
    password: hash
   })

   const token = jwt.sign(
    {
        id: user.id, username: user.username
    },
    process.env.JWT_SECRET,
    { expiresIn:"1d"}
   ) 

   res.cookie("token", token)
   res.status(201).json({
    message: "User registered successfully",
    user: {
        id: user.id,
        username: user.username,
        email: user.email
    }
   })
}

/**
 * @name loginUserController
 * @description login a user, expects email and password in the required body of the request. It will check if the user exists with the same email, if not it will return an error message. If user exists it will compare the password with the hashed password stored in the database, if it matches it will generate a JWT token and return it in the response.
 * @access Public
 */
async function loginUserController(req, res){
    const {email, password}= req.body
    const user = await userModel.findOne({ email })
    if(!user){
        return res.status(400).json({
            success: false,
            message: "User with this email does not exist"
        })
    }
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if(!isPasswordValid){
        return res.status(400).json({
            success: false,
            message: "Invalid password"
        })
    }
    const token = jwt.sign({
        id: user._id,
        username:user.username
    },
    process.env.JWT_SECRET,{
    expiresIn: "1d"
      })
    res.cookie("token", token)
    res.status(200).json({
        message: "User logged in successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}


/**
 * @name logoutUserController
 * @description logout a user, expects token in the cookies of the request, it will add the token in the blacklist collection and clear the token cookie from the response.
 * @access Public
 */
async function logoutUserController(req, res){
    const token = req.cookies.token

    if(token){
      await tokenBlacklistModel.create({ token })
      res.clearCookie("token")
      res.status(200).json({
        success: true,
        message: "User logged out successfully"
      })
    }
}

/**
 * @name getMeController
 * @description Get the details of the current logged in user
 * @access Private
 */
async function getMeController(req, res){
const user = await userModel.findById(req.user.id)

res.status(200).json({
    message: "User details fetched successfully",
    user:{
        id: user._id,
        username: user.username,
        email: user.email
    }
})
}




module.exports = {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController
}