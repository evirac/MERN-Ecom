const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    Category: { type: String, required: true },
    SubCategory: { type: String, required: true },
    Image: { type: Buffer, required: false }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
