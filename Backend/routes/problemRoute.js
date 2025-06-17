const express = require("express")
const authmidware = require("../middleware/authmidware")
const adminmidware = require("../middleware/adminmidware")

const problemRouter = express.Router()

//admin can do that
problem.post("/create",authmidware,adminmidware,problemCreate)
// problem.patch("/:id",problemUpdate)
// problem.delete("/:id",problemDelete)

// //everyone can do that
// problemRouter.get("/:id",problemFetch);
// problemRouter.get("/", getAllProblem);
// problemRouter.get("/user", solvedProblem);

module.exports = problemRouter