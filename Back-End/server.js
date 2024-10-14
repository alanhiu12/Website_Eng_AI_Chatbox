const express = require('express');
var app = express();
var router1 = require('./apiRouter.js')


var router2 = express.Router()

app.get('/', (req, res) => {
    res.json('Home')
});


app.use('/api1', router1);

//localhost:3000/api1/
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000')
});