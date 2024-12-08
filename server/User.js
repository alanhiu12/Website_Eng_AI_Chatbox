const mongoose = require('mongoose');

// Kết nối với cơ sở dữ liệu MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Student");
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database cannot be Connected:", error.message);
        process.exit(1); // Dừng chương trình nếu không thể kết nối
    }
};

// Tạo Schema cho User
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
        unique: true, // Đảm bảo email là duy nhất
        match: /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, // Đảm bảo định dạng email hợp lệ
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['teacher', 'student'],
        required: true,
    },

}, { timestamps: true }); // Thêm trường timestamps tự động lưu thời gian tạo và cập nhật

// Tạo mô hình collection và chỉ định tên collection
const User = mongoose.model('User', userSchema, 'users'); // Đặt tên collection là 'users'

// Xuất mô hình User và hàm connectDB
module.exports = { User, connectDB };
