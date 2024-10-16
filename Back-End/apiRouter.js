<<<<<<< HEAD
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
=======
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
>>>>>>> 71b12527e14a0fcbcb66f96a107dd2036812ede1
module.exports = router;