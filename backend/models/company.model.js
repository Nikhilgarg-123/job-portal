const mongoose = require('mongoose');

const ConpanySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    website: {
        type: String,
        unique: true
    },
    location: {
        type: String,
        required: true
    },
   logo:{
       type: String
   },
   userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
   }
},{
    timestamps: true
});

module.exports = mongoose.model('Company', CompanySchema);