
const mongoose = require('mongoose');

const featureSchema = new mongoose.Schema({
    image: String
},{timestamps: true});

module.exports = mongoose.model('features', featureSchema);