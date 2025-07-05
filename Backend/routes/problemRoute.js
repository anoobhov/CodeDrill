const express = require("express")
const authmidware = require("../middleware/authmidware")
const adminmidware = require("../middleware/adminmidware")
const {problemCreate,problemUpdate,problemDelete,problemFetch,getAllProblem,submitCode,solvedProblem,submissionsPerProblem,runCode,POTD_update, POTD_get} = require("../controller/problemcontrol")
const HintAi = require("../controller/HintAi")
const problemRouter = express.Router()

//admin can do that
problemRouter.post("/problemcreate",authmidware,adminmidware,problemCreate)
problemRouter.put("/problemUpdate/:id",authmidware,adminmidware,problemUpdate)
problemRouter.delete("/problemDelete/:id",authmidware,adminmidware,problemDelete)
problemRouter.get('/potd_update/:id',authmidware,adminmidware,POTD_update)

// //everyone can do that
problemRouter.get("/problembyId/:id",authmidware,problemFetch);
problemRouter.get("/allproblems",authmidware,getAllProblem);
problemRouter.get("/potd",authmidware,POTD_get);
problemRouter.post("/submit/:id",authmidware,submitCode)
problemRouter.post("/run/:id",authmidware,runCode)
problemRouter.get("/user",authmidware, solvedProblem);
problemRouter.get("/submissions/:pid",authmidware,submissionsPerProblem)

// Other Features
problemRouter.post("/chat",authmidware,HintAi)

module.exports = problemRouter