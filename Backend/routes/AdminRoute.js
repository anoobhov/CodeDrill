const express = require("express")
const authmidware = require("../middleware/authmidware")
const adminmidware = require("../middleware/adminmidware")

const adminRouter = express.Router()

const {adminStats, userStats} = require("../controller/adminstats")

adminRouter.get("/adminstats",authmidware,adminmidware,adminStats)
adminRouter.get("/userstats",authmidware,userStats)


module.exports = adminRouter