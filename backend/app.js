const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const expressValidator = require("express-validator");
require("dotenv").config();

// Import Routes
const authRouters = require("./routes/auth");
const userRouters = require("./routes/user");
const categoryRouters = require("./routes/category");
const productRouters = require("./routes/product");
const braintreeRouters = require("./routes/braintree");
const orderRouters = require("./routes/order");

// app
const app = express();

// Db Connection
mongoose
  .connect(process.env.MONGODB_URI, {
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("MongoDb Connected"))
  .catch((error) => {
    console.log("Error connected to mongodb");
  });

// Middleware
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());

// Routes Middleware
app.use("/api", authRouters);
app.use("/api/user", userRouters);
app.use("/api/category", categoryRouters);
app.use("/api/product", productRouters);
app.use("/api/braintree", braintreeRouters);
app.use("/api/order", orderRouters);

const port = process.env.PORT || 8082;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
