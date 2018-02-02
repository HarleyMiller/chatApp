const express = require('express');
const router = express.Router();
const path = require('path');

// this is a route, it points to the home page / root
router.get('/', (req, res)=> {
  res.sendFile(path.resolve(__dirname, '../views/index.html'));
});

module.exports = router;
