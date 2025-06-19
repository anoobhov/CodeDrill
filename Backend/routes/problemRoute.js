const express = require("express")
const authmidware = require("../middleware/authmidware")
const adminmidware = require("../middleware/adminmidware")
const {problemCreate,problemUpdate,problemDelete,problemFetch,getAllProblem,submitCode,solvedProblem,submissionsPerProblem} = require("../controller/problemcontrol")
const problemRouter = express.Router()

//admin can do that
problemRouter.post("/problemcreate",authmidware,adminmidware,problemCreate)
problem.put("/problemUpdate/:id",authmidware,adminmidware,problemUpdate)
problem.delete("/problemDelete/:id",authmidware,adminmidware,problemDelete)

// //everyone can do that
problemRouter.get("/:id",authmidware,problemFetch);
problemRouter.get("/allproblems",authmidware,getAllProblem);
problemRouter.post("/submit/:id",authmidware,submitCode)
problemRouter.get("/user",authmidware, solvedProblem);
problemRouter.get("/submissions/:pid",authmidware,submissionsPerProblem)

module.exports = problemRouter