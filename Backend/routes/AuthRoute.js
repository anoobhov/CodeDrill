const express = require("express")
const authRouter = express.Router()
const {register,login,logout,adminRegister} = require("../controller/authcontrol")
const authmidware = require("../middleware/authmidware")
const adminmidware = require("../middleware/adminmidware")


authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/logout",authmidware,logout)
authRouter.post("/admin",authmidware,adminmidware,adminRegister)

module.exports = authRouter