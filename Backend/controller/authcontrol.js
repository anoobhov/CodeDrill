const User = require("../schema/user")
const validate = require('../utils/validate')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const register = async(req,res)=>{
    try{
        validate(req.body)
        const {firstName,emailId,password} = req.body
        req.body.password = await bcrypt.hash(password,10)

        const user = await User.create(req.body)
        const token = jwt.sign({_id:user._id,emailId:user.emailId},process.env.JWTKEY,{expiresIn:60*60})
        res.cookie = ('token',token,{maxAge:60*60*1000})
        res.status(201).send("Registered!!")
    }catch(err){
        res.send("Error: "+err.message)
    }

}