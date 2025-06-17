const authmidware = async(req,res,next)=>{
    try {
        if(req.result.role!='admin')
            throw new Error("Only Admin have access")
        next()

    } catch (error) {
        res.send("Error: "+error.message)
    }
}

module.exports = authmidware;