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
    const user = await User.create(req.body)
    const token = createJWT(user)
    res.json(token)
}

async function login(req, res){
    const {email, password} = req.body
    const user = await User.findOne({email: email})
    if (!user) {
        res.status(400).json('Bad Credentials')
    }

    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        res.status(400).json('Bad Credentials')
    }

    res.json(createJWT(user))
}


module.exports = {createUser, login}