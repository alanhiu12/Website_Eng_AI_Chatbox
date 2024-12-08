// File.js
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
    filename: String,
    path: String,
    size: Number,
    originalname: String,
    uploadedAt: { type: Date, default: Date.now },
});

const File = mongoose.model('File', fileSchema);

module.exports = { File };
