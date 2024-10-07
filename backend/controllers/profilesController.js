const Profile = require('../models/profile')

async function fetchProfile(req, res){
    const username = req.params.username
    const profile = await Profile.findOne({username:username})
    res.status(200).json({profile:profile})
}

async function updateProfile(req, res){
    const username = req.user.name
    await Profile.findOneAndUpdate({username:username},req.body)

    const updatedProfile = await Profile.findOne({username:username})

    res.status(200).json({profile:updatedProfile})
}

module.exports = {fetchProfile, updateProfile}