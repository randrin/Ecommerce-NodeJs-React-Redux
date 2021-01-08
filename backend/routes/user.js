const express = require('express');
const router = express.Router();

const { setUp } = require("../controllers/user");

router.get('/', setUp);

module.exports = router;