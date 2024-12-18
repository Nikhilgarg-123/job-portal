const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req,res) =>{
    console.log('register route')
    const {name, email,phone,  password , role } = req.body;

    if(!name || !email || !phone || !password || !role){
        return res.status(400).json({success: false, message: "Please fill all the fields"});
    }
    // check if user already exists
    try {
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({success: false, message: "User already exists"});
        }
        // create new user
        const newUser = new User({name, email, phone, password, role});
        // hash password
        const salt = await bcrypt.genSalt(10);
        newUser.password = await bcrypt.hash(password, salt);
        await newUser.save();
        res.json({success: true, message: "User registered successfully"});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Server error"});
    }
}

const loginUser = async (req,res) => {
    const {email, password,role} = req.body;
    if(!email || !password || !role){
        return res.status(400).json({success: false, message: "Please fill all the fields"});
    }
    try {
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({success: false, message: "User not found"});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({success: false, message: "Invalid credentials"});
        }

        if(user.role !== role){
            return res.status(400).json({success: false, message: "Invalid credentials for this Role"});
        }

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'});
        
        user={
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile,
            token: token
        }

        return res.status(200).cookie('token', token, {
            httpOnly: true,
            sameSite: 'strict',
            maxAge: 24 * 60 * 60 * 1000
        }).json({success: true, user,message: "User logged in successfully"});
        
        
     //   res.cookie('token', token,  {httpOnly: true , maxage: 24 * 60 * 60 * 1000 });




     //   res.json({success: true, message: "User logged in successfully"});
    } catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Server error"});
    }
}

 const logout = async (req, res) => {
    try{
        res.clearCookie('token', { path: '/' });
        res.json({success: true, message: "User logged out successfully"});
    }catch (error) {
        console.log(error);
        res.status(500).json({success: false, message: "Server error"});
    }

}

const updateprofile = async (req, res) => {
    try {
        const user = await User.findById(req.user);  // Assuming user.id is being passed from the authentication middleware
       // console.log(req.user,user) ;
        console.log(req.body) ;
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const skillsupdated = req.body.skills.split(',');

        // Updating the user profile
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        user.phone = req.body.phone || user.phone;
        user.role = req.body.role || user.role;
        user.profile.bio = req.body.bio || user.profile.bio;  // Fixed: Accessing profile fields correctly
        user.profile.location = req.body.location || user.profile.location;
        user.profile.skills = skillsupdated || user.profile.skills;  // Fixed: Updating array properly
        user.profile.experience = req.body.experience || user.profile.experience;
        user.profile.education = req.body.education || user.profile.education;
        user.profile.resume = req.body.resume || user.profile.resume;
        user.profile.github = req.body.github || user.profile.github;
        user.profile.profilePhoto = req.body.profilePhoto || user.profile.profilePhoto;

        await user.save();
        console.log("dfsdfsdfsdfuser") ;

        // Returning updated user profile in the response
        const updatedUser = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            profile: user.profile
        };

        res.json({ success: true, user: updatedUser, message: "Profile updated successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};


module.exports = {registerUser, loginUser, logout, updateprofile};