const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.json('router 1 user');
});

router.get('/cart', (req, res) => {
    res.json('router 1 cart')
});

router.get('/learn', (req, res) => {
    res.json('router 1 learning')
});

// Export the router to use in app.js
module.exports = router;