const express = require('express');
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const cors= require('cors');
const connectDB = require('./config/db');

const app = express();

// load environment variables
dotenv.config();

const port = process.env.PORT || 3000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());


app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port ${port}`);
});