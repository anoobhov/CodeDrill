const express = require("express")
const authmidware = require("../middleware/authmidware")
const adminmidware = require("../middleware/adminmidware")
const {problemCreate,problemUpdate,problemDelete,problemFetch,getAllProblem,submitCode,solvedProblem,submissionsPerProblem,runCode} = require("../controller/problemcontrol")
const HintAi = require("../controller/HintAi")
const problemRouter = express.Router()

//admin can do that
problemRouter.post("/problemcreate",authmidware,adminmidware,problemCreate)
problemRouter.put("/problemUpdate/:id",authmidware,adminmidware,problemUpdate)
problemRouter.delete("/problemDelete/:id",authmidware,adminmidware,problemDelete)

// //everyone can do that
problemRouter.get("/problembyId/:id",authmidware,problemFetch);
problemRouter.get("/allproblems",authmidware,getAllProblem);
problemRouter.post("/submit/:id",authmidware,submitCode)
problemRouter.post("/run/:id",authmidware,runCode)
problemRouter.get("/user",authmidware, solvedProblem);
problemRouter.get("/submissions/:pid",authmidware,submissionsPerProblem)
problemRouter.post("/chat",authmidware,HintAi)

module.exports = problemRouter