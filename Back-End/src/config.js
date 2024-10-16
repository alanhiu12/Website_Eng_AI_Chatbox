<<<<<<< HEAD
const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");


// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
    .catch(() => {
        console.log("Database cannot be Connected");
    })

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;

=======
const mongoose = require('mongoose');
const connect = mongoose.connect("mongodb://localhost:27017/Login-tut");


// Check database connected or not
connect.then(() => {
    console.log("Database Connected Successfully");
})
    .catch(() => {
        console.log("Database cannot be Connected");
    })

// Create Schema
const Loginschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

// collection part
const collection = new mongoose.model("users", Loginschema);

module.exports = collection;

>>>>>>> 71b12527e14a0fcbcb66f96a107dd2036812ede1
