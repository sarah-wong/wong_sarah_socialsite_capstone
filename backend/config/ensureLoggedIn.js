function ensureLoggedIn(req, res, next){
    if(req.user){
        console.log(`Logged in as ${req.user.name}`);
        return next()
    }
    else{
        res.status(401).json('Not logged in')
    }
}

module.exports = ensureLoggedIn