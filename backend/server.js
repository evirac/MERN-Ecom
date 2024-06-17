const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { MONGODB_URI } = require('./config');
const productRoutes = require('./routes/product_routes');
const userRoutes = require('./routes/user_routes')

const app = express();
app.use(cors());
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

app.listen(5500, () => {
    console.log("server is running on port 5500");
});
