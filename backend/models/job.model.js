const mongoose = require('mongoose');

const  jobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    jobtype: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Company',
        required: true
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    applications: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Application'    }
},{
    timestamps: true
});

module.exports = mongoose.model('Job', jobSchema);