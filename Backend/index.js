const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
require("dotenv").config
const authRoute = require("./routes/AuthRoute")
const main = require("./database/maindb")

app.use(express.json())
app.use(cookieParser())
app.use("/auth",authRoute)
main()
.then(async () => {
    app.listen(process.env.PORT,()=>{
        console.log("Port activated: ")
    })
})