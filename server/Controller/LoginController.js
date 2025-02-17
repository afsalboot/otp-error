const user = require('../Models/userSchema');
const argon = require('argon2');
const jwt = require('jsonwebtoken');

const loginAccount = async (req,res)=> {
    try{
        const userLogin = await user.findOne({email:req.body.email})
        console.log("userLogin",userLogin);
        if(!userLogin){
            return res.status(401).json("Invalid mail")
    }

    if(await argon.verify(userLogin.password,req.body.password)){
        const token = jwt.sign({id:userLogin._id},process.env.secretKey,{expiresIn:'1d'})

        console.log("token",token);

        return res.status(200).json({userId:userLogin._id,token:token,message:"Login successfull"})      
    }else{
        return res.status(401).json("Invalid password")
    }
    }catch(err){
        return res.status(500).json(err)
    }
}

module.exports = {loginAccount}