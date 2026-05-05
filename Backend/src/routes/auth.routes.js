const express = require('express')
const authController = require("../controllers/auth.controller")
const authRouter = express.Router()
//Another Way to create router is by using express.Router() method. 
// It is used to create a new router object. We can use this router object to define our routes and then export it to use in our main app.js file.
// const {Router} = require('express)
// const authRouter = Router()
const authMiddleware = require("../middlewares/auth.middleware")

/** JSDoc comments for API documentation
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", authController.registerUserController)


/**
 * @route POST /api/auth/login
 * @description Login a user with email and password
 * @access Public
 */
authRouter.post("/login", authController.loginUserController)


/**
 * @route GET /api/auth/logout
 * @description Logout a user by clearing the token cookie and add token in blacklist
 * @access Public
 */

authRouter.get("/logout", authController.logoutUserController)
 

/**
 * @route GET /api/auth/get-me
 * @description Get the details of the logged in user, expects token in the cookies of the request, it will verify the token and return the user details in the response.
 * @access Private
*/
authRouter.get("/get-me", authMiddleware.authUser,authController.getMeController) // we are using authMiddleware.authUser middleware to protect this route, it will check for the token in the cookies of the request and verify it, if the token is valid then it will call the next middleware which is getMeController to get the user details and return in the response, if the token is invalid then it will return an error response with status code 401 and message "Unauthorized, invalid token"


module.exports = authRouter
