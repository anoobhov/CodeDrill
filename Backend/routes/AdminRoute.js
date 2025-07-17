const express = require("express")
const authmidware = require("../middleware/authmidware")
const adminmidware = require("../middleware/adminmidware")

const adminRouter = express.Router()

const {userStats} = require("../controller/adminstats")
adminRouter.get("/userStats",authmidware,adminmidware,userStats)


module.exports = adminRouter