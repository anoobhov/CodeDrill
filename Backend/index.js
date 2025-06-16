const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
require("dotenv").config()
const authRouter = require("./routes/AuthRoute")
const main = require("./database/maindb")
const redisClient = require("./database/redis")


app.use(express.json())
app.use(cookieParser())
app.use("/auth",authRouter)
// main()
// .then(async () => {
//     app.listen(process.env.PORT,()=>{
//         console.log("Port activated: ")
//     })
// })

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