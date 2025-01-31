const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

// Database connection
const connectDB = require('./Config/db');
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// Routes
const userRoutes = require('./Routes/userRoutes');
const categoryRoutes=require('./Routes/categoryRoutes');
const resturant=require('./Routes/resturantRoutes')
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/category',categoryRoutes)
app.use('/api/v1/resturant',resturant)

// Server
const PORT = process.env.PORT || 5000; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
