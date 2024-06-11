const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');
const productRoutes = require('./routes/product_routes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(MONGODB_URI)
    .then(() => console.log("DB connected"))
    .catch((error) => console.log("Some error while connecting to DB", error));

app.use('/getProducts', productRoutes);

app.listen(5500, () => {
    console.log("server is running on port 5500");
});
