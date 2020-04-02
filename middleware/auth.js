const jwt = require('jsonwebtoken');
function auth(req,res,next){
    const token =req.header('x-auth-token');
    if(!token)
        return res.status(401).send('Access Denied No Token Provided');
    try{
        const public = await fs.readFileSync(__dirname + '/../config/public.key','utf8')
        req.user = jwt.verify(token,public);
        next();
    }
    catch{
        return res.status(400).send('Access Denied Invalid Provided');
    }
}