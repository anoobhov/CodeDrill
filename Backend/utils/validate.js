const validate = (data)=>{
    const mandatoryData = ['firstName',"emailId",'password']
    const IsAllowed = mandatoryData.every((k)=>Object.keys(data).includes(k))
    
    if(!IsAllowed)
        throw new Error("Incomplete Credentials")

    if(!validator.isEmail(data.emailId))
        throw new Error("Invalid Email");
}

module.exports = validate