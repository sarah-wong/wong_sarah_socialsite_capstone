const jwt = require('jsonwebtoken')

function validateToken(req, res, next){
    const token = req.get("Authorization") || req.query.token;
    if(token){
        jwt.verify(token, process.env.SECRET, function (err, decoded){
            req.user = err? null:decoded.user;
            // console.log(`Token decoded, User: ${req.user.name}`);
            return next()
        })
    }
    else{
        req.user = null;
        // console.log('No token');
        return next()
    }
}

module.exports = validateToken