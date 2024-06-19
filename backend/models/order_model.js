const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    cart: [{
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true },
    }],
    shippingAddress: {
        fullName: String,
        address: String,
        city: String,
        postalCode: String,
        country: String,
    },
    paymentMethod: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    isPaid: { type: Boolean, default: false },
    isDelivered: { type: Boolean, default: false },
    paidAt: { type: Date },
    deliveredAt: { type: Date },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;