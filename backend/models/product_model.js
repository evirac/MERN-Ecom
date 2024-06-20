const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    rating: { type: Number, required: true },
    review: { type: String }
}, {
    timestamps: true
});

const productSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Price: { type: Number, required: true },
    Category: { type: String, required: true },
    SubCategory: { type: String, required: true },
    Image: { type: Buffer, required: false },
    reviews: [reviewSchema],
    averageRating: { type: Number, default: 0 }
});

const ProductModel = mongoose.model('Product', productSchema);

module.exports = ProductModel;
