require('dotenv').config();

module.exports = {
    MONGODB_URI: process.env.MONGODB_URI,
    SECRET_KEY: process.env.SECRET_KEY,
    PORT: process.env.PORT || 5500
}
