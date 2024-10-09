const Profile = require('../models/profile')

async function fetchProfile(req, res){
    const username = req.params.username
    const profile = await Profile.findOne({username:username})
    res.status(200).json({profile:profile})
}

async function editProfile(req, res){
    const userId = req.user._id
    await Profile.findOneAndUpdate({meta:{userId:userId}},req.body)

    const updatedProfile = await Profile.findOne({meta:{userId:userId}})

    res.status(200).json({profile:updatedProfile})
}

async function updateFollowers(req, res, next){
    const follow = req.body.follow

    const userId = req.user._id
    const source = await Profile.findOne({username:req.user.name})

    const target = await Profile.findOne({username:req.params.username})

    let sourceFollowing = await source.meta.following
    let targetFollowers = await target.meta.followers

    sourceFollowing = sourceFollowing.filter((id)=>String(id) != String(target._id))
    targetFollowers = targetFollowers.filter((id)=>String(id) != String(userId))

    if(follow){
        sourceFollowing.push(target._id)
        targetFollowers.push(userId)
    }

    await Profile.findByIdAndUpdate(source._id, {
        meta:{
            ...source.meta,
            following: sourceFollowing
        }
    })

    await Profile.findByIdAndUpdate(target._id, {
        meta:{
            ...target.meta,
            followers: targetFollowers
        }
    })

    const updatedTarget = await Profile.findByIdAndUpdate(target._id)
    res.status(200).json({profile:updatedTarget})
}

module.exports = {fetchProfile, editProfile, updateFollowers}