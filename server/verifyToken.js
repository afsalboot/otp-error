const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {

    console.log("verifyToken id",req.params.userId);

    console.log("verify Token", req.headers.token);
    
    const token = req.headers.token

    console.log("token value",token);
    

    if (token) {

        jwt.verify(token,process.env.secretKey,(err,data)=>{

            if(err) return res.status(401).json('invalid token')

                console.log("data value in verify token",data);

            if(req.params.userId == data.id){

                next()
            }

            else{
                return res.status(401).json('userid and token missmatched')
            }

        })

    } else {
        return res.status(401).json('not authorized')
    }
}

module.exports = verifyToken