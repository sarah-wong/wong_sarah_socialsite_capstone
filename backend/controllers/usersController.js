const User = require('../models/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

function createJWT(user){
    console.log('Creating JWT');
    return jwt.sign(
        {user},
        process.env.SECRET,
        {expiresIn: '24h'}
    )
}

async function createUser(req, res){
    const saltRounds = 10
    const {name, email, password, confirm} = req.body
    
    if(password !== confirm){
        // HTTP 400 Bad Request
        res.status(400).json('Bad Credentials')
    }

    bcrypt.hash(password, saltRounds).then(async (result) => {
        const user = await User.create({
            name:name,
            email:email,
            password:result
        })
        // HTTP 200 Success
        res.status(200).json(createJWT(user))
    })
}

async function login(req, res){
    const {email, password} = req.body
    const user = await User.findOne({email: email})
    if (!user) {
        // HTTP 400 Bad Request
        res.status(400).json('Bad Credentials')
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        // HTTP 400 Bad Request
        res.status(400).json('Bad Credentials')
    }

    // HTTP 200 Success
    res.status(200).json(createJWT(user))
}


module.exports = {createUser, login}