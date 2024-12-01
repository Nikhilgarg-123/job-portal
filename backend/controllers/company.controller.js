const Company = require('../models/company.model');
const User = require('../models/user.model');

const companyregister = async (req, res) => {
    console.log('register route');
    
    try {
        const { name, location, website, logo } = req.body;
        const user = await User.findById(req.user);  
        if (user.role !== 'recruiter') {
            return res.status(403).json({ success: false, message: "Only recruiters are allowed to register companies" });
        }

        if (!name || !location) {
            return res.status(400).json({ success: false, message: "Please fill all the required fields (name, location)" });
        }
       const existingCompany = await Company.findOne({ name });
        if (existingCompany) {
            return res.status(400).json({ success: false, message: "Company already exists" });
        }

        const newCompanyData = {
            name,
            location,
            userId: user._id // Attach the recruiter user as the creator of the company
        };

        if (website) {
            newCompanyData.website = website;
        }

        if (logo) {
            newCompanyData.logo = logo;
        }
        const newCompany = new Company(newCompanyData);
        console.log(newCompany);
        const companySaved = await newCompany.save();
        console.log(newCompany);

        // Respond with only necessary details (companyId and userId)
        res.json({
            success: true,
            message: "Company registered successfully",
            companyId: companySaved._id,
            userId: companySaved.userId
        });

    } catch (error) {
        console.error("Error details: ", error); // Log the error details to get more information
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
};


const getcompany = async (req, res) => {
    try {
        const user = await User.findById(req.user);  
        if (user.role !== 'recruiter') {
            return res.status(403).json({ success: false, message: "Only recruiters are allowed to register companies" });
        }
        const companies = await Company.find({ userId: user._id });
        if (companies.length === 0) {
            return res.status(404).json({ success: false, message: "No companies found for this recruiter" });
        }
        res.json(companies);
        
    } catch (error) {    
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

const getcompanybyid = async (req, res) => {
    try {
        const user = await User.findById(req.user);  
        if (user.role !== 'recruiter') {
            return res.status(403).json({ success: false, message: "Only recruiters are allowed to register companies" });
        }
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }
        //res.json(company);


        return res.status(200).json({ success: true, message: "Company found", company });
    } catch (error) {    
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}

const updatecompany = async (req, res) => {
    try {
        const user = await User.findById(req.user);  
        if (user.role !== 'recruiter') {
            return res.status(403).json({ success: false, message: "Only recruiters are allowed to register companies" });
        }
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ success: false, message: "Company not found" });
        }
        company.name = req.body.name || company.name;
        company.location = req.body.location || company.location;
        company.website = req.body.website || company.website;
        company.logo = req.body.logo || company.logo;
        await company.save();
        return res.json({ success: true, message: "Company updated successfully", company });
    } catch (error) {    
        res.status(500).json({ success: false, message: "Server error", error: error.message });
    }
}



module.exports = { companyregister, getcompany, getcompanybyid , updatecompany };
