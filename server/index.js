
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const { User, connectDB } = require('./User'); // File User.js đã được tạo
const app = express();
const bodyParser = require('body-parser');

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Cung cấp tệp tĩnh từ thư mục "uploads"

connectDB(); // Kết nối đến cơ sở dữ liệu MongoDB

// Cấu hình Multer để lưu trữ tệp
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Sửa cú pháp sử dụng dấu nháy
    }
});

const upload = multer({ storage });

// Đăng ký tài khoản
app.post('/register', async (req, res) => {
    const { fullname, email, password, role } = req.body;
    try {
        const newUser = new User({ fullname, email, password, role });
        await newUser.save(); // Lưu người dùng vào cơ sở dữ liệu
        return res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        console.error('Lỗi đăng ký:', error);
        return res.status(500).json({ message: 'Đăng ký thất bại.' });
    }
});

// Đăng nhập
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không hợp lệ.' });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: 'Email hoặc mật khẩu không hợp lệ.' });
        }
        return res.status(200).json({
            message: 'Đăng nhập thành công!',
            user: {
                fullname: user.fullname,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Lỗi đăng nhập:', error);
        return res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
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
        user.profileImage = req.file.filename; // Lưu tên tệp
        await user.save();
        res.status(200).json({ imagePath: req.file.filename }); // Trả về tên tệp
    } catch (error) {
        console.error('Lỗi tải ảnh:', error);
        res.status(500).json({ message: 'Tải ảnh thất bại' });
    }
});



app.listen(3500, () => {
    console.log('Server is running on port 3500');
});
