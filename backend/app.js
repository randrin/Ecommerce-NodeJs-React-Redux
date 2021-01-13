const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();

// Import Routes
const userRouters = require('./routes/user');

// app
const app = express();

// Db Connection
mongoose.connect(process.env.MONGODB_URI, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true
}).then(() => console.log('MongoDb Connected'))
.catch((error) => {
  console.log("Error connected to mongodb");
});

// Middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());

// Routes Middleware
app.use('/api', userRouters);

const port = process.env.PORT || 8082;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});