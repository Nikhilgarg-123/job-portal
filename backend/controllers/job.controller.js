const Company = require('../models/company.model');
const User = require('../models/user.model');
const Job = require('../models/job.model');
const postjob = async (req, res, next) => {
    try {

        // Validate input
        const {title, description, requirements, location, salary, jobtype, position,company ,experience} = req.body;
        if (!title ||!description ||!requirements ||!location ||!salary ||!jobtype ||!position ||!company || !experience) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        console.log(req.user);

        const user = await User.findById(req.user); 
        console.log(user); 
        if (user.role !== 'recruiter') {
            return res.status(403).json({ success: false, message: "Only recruiters are allowed to post jobs" });
        }
        const reqarr= requirements.split(',');
        

        const newJob = new Job({
            title,
            description,
            requirements: reqarr,
            location,
            salary,
            jobtype,
            position,
            company,
            experience,
            created_by: user._id
        });
        console.log(newJob);
        await newJob.save();
        res.status(201).json({ success: true, message: "Job posted successfully", job: newJob });
    } catch (error) {
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};

module.exports = {postjob};