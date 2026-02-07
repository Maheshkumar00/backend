const asyncHandler = require('express-async-handler')
const User = require("./model/User")

const getUsers = asyncHandler(async(req,res) => {
    const users = await User.find({}).select("-password");
    res.json(users)
})

const getUserProfile = asyncHandler(async (req,res) => {
    const user = await User.findById(req.user._id).select("-password")
    if (user){
        res.json(user)
    }
    else{
        res.status(404);
        throw new Error('USer not found')
    }
})

const deleteUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);
    if(!user){
       res.status(404);
       throw new Error("USer not found");
    }
    if(req.user._id.toString() === user._id.toString()){
         res.status(400);
         throw new Error("cant delete yourself")
    }
    await User.findByIdAndDelete(req.params.id);
    res.json({message : "user deleted succesfully"})
})

const toggleUserBlock = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id);
    
    if(!user){
        res.status(404)
        throw new Error("user not exist")
    }
        if(user.role === 'admin'){
        res.status(400);
        throw new Error("cant delete other admin")
    }
    if(req.user._id.toString() === user._id.toString()){
        res.status(400)
        throw new Error("cant blcok yourself")
    }

    user.isBlocked = !user.isBlocked;
    await user.save(); // we have to save it 
    res.json({
        message: user.isBlocked ? 'user is blocked' : 'user is not blocked',
        isBlocked : user.isBlocked,
})
})
module.exports = {
    getUsers,
    getUserProfile,
    deleteUser,
    toggleUserBlock,
}