const mongoose = require('mongoose');

// Kết nối với cơ sở dữ liệu MongoDB mà không sử dụng các tùy chọn deprecated
const connectDB = async () => {
    try {
        // Kết nối trực tiếp mà không cần các tùy chọn không còn hiệu lực
        await mongoose.connect("mongodb://localhost:27017/Student");
        console.log("Database Connected Successfully");
    } catch (error) {
        console.error("Database cannot be Connected:", error.message);
        process.exit(1); // Dừng chương trình nếu không thể kết nối
    }
};

// Tạo Schema
const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
    profilePicture: {
        type: String, // Lưu trữ URL hoặc đường dẫn của ảnh
    },
});

// Tạo mô hình collection và chỉ định tên collection
const User = mongoose.model('User', userSchema, 'users'); // Đặt tên collection là 'users'

// Xuất mô hình User và hàm connectDB
module.exports = { User, connectDB };
