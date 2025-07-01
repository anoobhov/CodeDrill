const express = require("express")
const authmidware = require("../middleware/authmidware")
const adminmidware = require("../middleware/adminmidware")
const videoRouter = express.Router()
const {generateUploadSignature,saveVideoMetadata,deleteVideo} = require("../controller/videoController")


videoRouter.get('upload/:problemId',authmidware,adminmidware,generateUploadSignature)
videoRouter.post('/save',authmidware,adminmidware,saveVideoMetadata)
videoRouter.delete('/delete/:problemId',authmidware,adminmidware,deleteVideo)

module.exports = videoRouter;