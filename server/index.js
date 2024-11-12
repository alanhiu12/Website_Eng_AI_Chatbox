const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { User, connectDB } = require('./User'); // Đảm bảo tệp User.js đã được tạo

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Cung cấp tệp tĩnh từ thư mục "uploads"

// Đảm bảo thư mục "uploads" tồn tại
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'uploads'));
}

// Kết nối MongoDB
connectDB();

// Cấu hình Multer để lưu trữ tệp
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = fileTypes.test(file.mimetype);
        if (extname && mimetype) {
            cb(null, true);
        } else {
            cb('Error: Only images allowed!');
        }
    }
});

// Đăng ký tài khoản
app.post('/register', async (req, res) => {
    const { fullname, email, password, role } = req.body;
    try {
        const newUser = new User({ fullname, email, password, role });
        await newUser.save();
        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        res.status(500).json({ message: 'Đăng ký thất bại.' });
    }
});

// Đăng nhập
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || user.password !== password) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không hợp lệ.' });
        }
        res.status(200).json({ message: 'Đăng nhập thành công!', user });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
    }
});

// Route tải ảnh lên
app.post('/upload-image', upload.single('image'), async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng' });
        }
        user.profileImage = req.file.filename;
        await user.save();
        res.status(200).json({ imagePath: req.file.filename });
    } catch (error) {
        res.status(500).json({ message: 'Tải ảnh thất bại' });
    }
});

app.listen(3500, () => {
    console.log('Server is running on port 3500');
});
