const express = require('express');
require('dotenv').config();


// app
const app = express();

app.get('/', (req, res) => {
  res.send('Hello set up ecommerce back end....');
})

const port = process.env.PORT || 8082;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});