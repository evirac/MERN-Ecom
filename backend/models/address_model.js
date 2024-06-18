const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    fullName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
}, { timestamps: true });

const Address = mongoose.model('Address', addressSchema);

module.exports = Address;
