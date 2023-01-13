const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const userRoutes = require('./routes/users');
require('dotenv').config();
app.set('view engine', 'ejs');


const app = express();

// Connect to MongoDB
connectDB();

// Enable CORS
app.use(cors());

// Create a new route for the endpoint in your server.js file:
app.get('/', (req, res) => {
    res.render('index', { message: 'Server is running' });
    res.send('Server is running');
});

// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Use routes
app.use('/api/users', userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: err
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
