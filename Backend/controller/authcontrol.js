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
        // console.log("Enterd register")
        const user = await User.create(req.body)
        if(!user){
            
        }

        req.body.role = 'user'

         const reply = {
        firstName: user.firstName,
        emailId: user.emailId,
        _id: user._id,
        role:user.role,
    }
        const token = jwt.sign({_id:user._id,emailId:user.emailId,role:'user'},process.env.JWTKEY,{expiresIn:60*60})
        res.cookie('token',token,{maxAge:60*60*1000})
        res.status(201).json({
            user:reply,
            message:"Registered Successfully"
        })
    }catch(err){
        res.send("Error: "+err.message)
        console.log(err.message)
    }
}

const login = async(req,res)=>{
    try{
        const {emailId,password} = req.body
        // console.log(emailId,password)
        if(!emailId || !password)
            throw new Error("Incomplete Credentials")

        const user = await User.findOne({emailId})
        console.log(user.password)
        const match = await bcrypt.compare(password,user.password)

        if(!match)
            throw new Error("Invalid Credentials")

        const reply = {
            firstName: user.firstName,
            emailId: user.emailId,
            _id: user._id,
            role:user.role,
            // likedproblem:user.likedProblem
        }

        const token = jwt.sign({_id:user._id,emailId:user.emailId,role:user.role},process.env.JWTKEY,{expiresIn:60*60})
        res.cookie('token',token,{maxAge:60*60*1000})
        res.status(201).json({
            user:reply,
            message:"Logged In successfully"
        })   
        console.log("logged in") 
}catch(err)
{
    res.send("error"+err.message)
    console.log("error"+err.message)

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

const deleteProfile = async (req,res) => {
    try{
    const userId = req.result._id
    await User.findByIdAndDelete(userId)
    // await Submission.deleteMany({userId});

    res.send('User Deleted')
    }catch(err)
    {
        res.send("Error"+err)
    }
}

module.exports = {
    register,
    login,
    logout,
    adminRegister,
    deleteProfile
}