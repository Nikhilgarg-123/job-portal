const mongoose = require('mongoose');

const UserSchema = new mongoose.UserSchema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: Number,
        required: true
    }
    ,
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['recruiter', 'jobseeker'],
        required: true
    },
    profile: {
        bio: {
            type: String
        },
        location: {
            type: String
        },
        skills: [{
            type: String
        }],
        experience: {
            type: String
        },
        education: {
            type: String
        },
        resume: {
            type: String
        },
        resumeOriginalName: {
            type: String
        },
        github: {
            type: String
        },
        company:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Company'
        },
        profilePhoto: {
            type: String,
            default:""
        }
    
    }
},{
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);