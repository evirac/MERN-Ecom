const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const { MONGODB_URI } = require('./config');
const productRoutes = require('./routes/product_routes');

//adding users
const UserModel = require('./models/user_model');
const bcrypt = require('bcryptjs');

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


// Register endpoint
app.post('/register', async (req, res) => {
    const { fullName, email, password } = req.body;

    try {
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new UserModel({
            fullName,
            email,
            password: hashedPassword // Save the hashed password
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ error: 'Error registering user' });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ userId: user._id }, 'secretKey', { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Error logging in' });
    }
});

// Verify token endpoint
app.post('/verifyToken', (req, res) => {
    const { token } = req.body;

    try {
        jwt.verify(token, 'secretKey');
        res.json({ valid: true });
    } catch (error) {
        res.status(401).json({ valid: false });
    }
});

// Profile endpoint
app.get('/profile', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).json({ message: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, 'secretKey');
        const user = await UserModel.findById(decoded.userId).select('-password');
        res.json(user);
    } catch (error) {
        console.error('Error fetching profile:', error);
        res.status(500).json({ error: 'Error fetching profile' });
    }
});


app.use('/getProducts', productRoutes);

app.listen(5500, () => {
    console.log("server is running on port 5500");
});
