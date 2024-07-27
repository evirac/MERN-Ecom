const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URI, PORT } = require('./config');
const productRoutes = require('./routes/product_routes');
const userRoutes = require('./routes/user_routes')
const adminRoutes = require('./routes/admin_routes')
const orderRoutes = require('./routes/order_routes')
const addressRoutes = require('./routes/address_route')

const app = express();

const allowedOrigins = [
    'http://localhost:5173', // Development origin
    'https://evirac-novanest.netlify.app', // Production origin,
    'https://main--beamish-mooncake-b13ad1.netlify.app/'
];

app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    }
}));

app.use(express.json());

mongoose.connect(MONGODB_URI);

mongoose.connection.on('connected', () => {
    console.log("DB connected");
});
mongoose.connection.on('error', (error) => {
    console.log("Some error while connecting to DB", error);
});

app.use('/products', productRoutes);
app.use('/users', userRoutes);
app.use('/admin', adminRoutes)
app.use('/orders', orderRoutes)
app.use('/addresses', addressRoutes)

app.listen(PORT, () => {
    console.log("server is running on port 5500");
});
