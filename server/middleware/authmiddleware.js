const jwt  = require("jsonwebtoken")

async function auth (req, res, next){
const token = req.header("Authorization");

    if(!token){
        return res.status(401).json({
            message: "Invalid token"
        });
    }
    else{
        try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.admin = decoded;
        next();}
        catch(err){
            res.status(401).json({
                message: "Invalid token"
            });
        }
    }
    

}
module.exports = auth;