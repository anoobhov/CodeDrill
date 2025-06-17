const redisClient = require("../database/redis")
const User = require("../schema/user")
const validate = require('../utils/validate')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")


const register = async(req,res)=>{
    try{
        validate(req.body)
        const {password} = req.body
        req.body.password = await bcrypt.hash(password,10)

        const user = await User.create(req.body)
        req.body.role = 'user'
        const token = jwt.sign({_id:user._id,emailId:user.emailId,role:'user'},process.env.JWTKEY,{expiresIn:60*60})
        res.cookie('token',token,{maxAge:60*60*1000})
        res.status(201).send("Registered!!")
    }catch(err){
        res.send("Error: "+err.message)
    }
}

const login = async(req,res)=>{
    try{
        const {emailId,password} = req.body
        if(!emailId || !password)
            throw new Error("Incomplete Credentials")

        const user = await User.findOne({emailId})
        const match = bcrypt.compare(password,user.password)

        if(!match)
            throw new Error("Invalid Credentials")
        
        const token = jwt.sign({_id:user._id,emailId:user.emailId,role:user.role},process.env.JWTKEY,{expiresIn:60*60})
        res.cookie('token',token,{maxAge:60*60*1000})
        res.status(201).send("Logged In!!")    
}catch(err)
{
    res.send("error"+err.message)
}
}

const logout = async (req,res) => {
    try {
        const {token} = req.cookies
        const payload = jwt.decode(token)
        console.log(payload)
        await redisClient.set(`token:${token}`,"Blocked")
        await redisClient.expireAt(`token:${token}`,payload.exp)

        res.cookie('token',null,{expiresIn:new Date(Date.now())})
        res.send('Logged out ')
    } catch (error) {
        res.send('error: '+error.message)
    }
}

const adminRegister= async (req,res)=>{
    try {
       if(req.result.role!='admin'){
        throw new Error("Access Forbidden")
    } 
    validate(req.body)
    const {password} = req.body
    req.body.password=await bcrypt(password,10)
    const user = await User.create(req.body)
    const token = jwt.sign({_id:user._id,emailId:user.emailId,role:user.role},process.env.JWTKEY,{expiresIn:60*60})
    res.cookie("token",token,{maxAge:60*60*1000})
    res.status(201).send("User registed successfully")
    } catch (error) {
        res.send("Error: "+error.message)
    }

}
module.exports = {
    register,
    login,
    logout,
    adminRegister
}