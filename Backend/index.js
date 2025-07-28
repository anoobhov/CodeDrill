const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
require("dotenv").config()
const authRouter = require("./routes/AuthRoute")
const problemRouter = require("./routes/problemRoute")
const videoRouter = require("./routes/videoRouter")
const adminRouter = require('./routes/AdminRoute')
const main = require("./database/maindb")
const redisClient = require("./database/redis")
const cors = require('cors')

app.use(cors({
    origin:"https://code-drill-one.vercel.app",
    credentials:true
}))

app.use(express.json())
app.use(cookieParser())

app.use("/auth",authRouter)
app.use("/problem",problemRouter)
app.use("/video",videoRouter);
app.use('/stats',adminRouter)

const InitializeConnection = async()=>{
    try {
        await Promise.all([redisClient.connect(),main()])
        console.log("DB connected: ")
        app.listen(process.env.PORT,()=>{
            console.log("Port Activated: ")
        })
    } catch (error) {
        console.log("Error: "+error.message)
    }
}

InitializeConnection()