const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');


// cart schema
const CartItemSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    quantity: { type: Number, required: true },
    // cart: [CartItemSchema]
});

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    cart: [CartItemSchema],
    isAdmin: { type: Boolean, default: false }
});

// Hash the password before saving
userSchema.pre('save', function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, (err, salt) => {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
