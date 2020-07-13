const jwt = require('jsonwebtoken');
const fs = require('fs');
async function  authenticate (req,res,next){
    const token =req.header('auth-token');
    if(!token)
        return res.status(401).send('Access Denied No Token Provided');
        const private = await fs.readFileSync(__dirname + '/../config/private.key','utf8')
    try{
       
        req.user = jwt.verify(token,private);
        next();
    }
    catch{
        return res.status(401).send('Access Denied Invalid Token');
    }
}

async function authorize(req,res,next) {
    if(!req.user.isAdmin)
        return res.status(403).send('Access Denied Not Authorized');
    next();

}
exports.authenticate = authenticate;
exports.authorize = authorize;