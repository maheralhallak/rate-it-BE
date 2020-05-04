const jwt = require('jsonwebtoken');

exports.checkAuth = (req, res ,next)=> {
    const userToken = req.header('x-auth-token');

    if(!userToken) {
        return res.status(401).json({status: "failed", message: "Authorization problem 5012"})
    }
    try {
        jwt.verify(userToken , process.env.JWT_SECRET_KEY, (fail,decodedPayload) => {
            if (fail) {
                res.status(401).json({status: "failed", message: "Authorrization problem 5013"})
            }else {
                req.userId = decodedPayload.id;
                next();
            }
        })
    }catch (error)
     {
        res.status(500).json({status: "error" , message: error})
    }
}