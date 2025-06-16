const express = require("express")
const authRouter = express.Router()
const {register,login,logout} = require("../controller/authcontrol")
const authmidware = require("../middleware/authmidware")



authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/logout",authmidware,logout)
