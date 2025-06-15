const cookieParser = require("cookie-parser")
const express = require("express")
const app = express()
require("dotenv").config
const main = require("./database/maindb")

app.use(express.json())
app.use(cookieParser())

main()
.then(async () => {
    app.listen(process.env.PORT,()=>{
        console.log("Port activated: ")
    })
})