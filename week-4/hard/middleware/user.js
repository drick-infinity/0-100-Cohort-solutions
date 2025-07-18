const jwt = require('jsonwebtoken');
function userMiddleware(req, res, next) {
    // Implement user auth logic
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({
            message:'No token Provided'
        })
    }
    const token = authHeader.split(' ')[1];

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }catch(err){
        return res.status(401).json({
            message:"Invalid or expired token"
        })
    }
}

function adminMiddleware(req,res,next)
{
    if(!req.user){
        return res.status(401).json({
            message:'Unauthorized:User not authenticate'
        })
    }

    if(req.user.role!=='admin'){
        return res.status(403).json({
            message:"Forbidden: Admin access only"
        })
    }
    next();
}
module.exports = userMiddleware;
module.exports = adminMiddleware;