const mongoose = require("mongoose")
// require("dotenv").config()
console.log(process.env.DATABASE_STRING)

async function main() {
    await mongoose.connect(process.env.DATABASE_STRING)
    console.log("DB connected :>)")
}

module.exports = main