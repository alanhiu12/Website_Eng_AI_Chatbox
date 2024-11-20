const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const { User, connectDB } = require('./User'); // Ensure this file exists

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve files from the 'uploads' folder

// Ensure the 'uploads' folder exists
if (!fs.existsSync(path.join(__dirname, 'uploads'))) {
    fs.mkdirSync(path.join(__dirname, 'uploads'));
}

// Connect to MongoDB
connectDB();

// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

// Allow all file types by removing the fileFilter restriction
const upload = multer({
    storage,
    // fileFilter: (req, file, cb) => {
    //     cb(null, true); // Allow all file types
    // }
});

// User registration route
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

// User login route
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

// File upload route
// Thay đổi endpoint để hỗ trợ upload nhiều file
app.post('/upload-files', upload.array('files', 3), async (req, res) => {
    try {
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Không có file nào được upload.' });
        }

        // Trả về danh sách tên file
        const fileUrls = req.files.map(file => file.filename);
        res.status(200).json({ fileUrls });
    } catch (error) {
        res.status(500).json({ message: 'Tải file thất bại', error });
    }
});
// Cập nhật route để lấy danh sách người dùng
app.get('/users', async (req, res) => {
    try {
        const users = await User.find(); // Lấy tất cả người dùng từ MongoDB
        res.status(200).json(users); // Trả về dữ liệu người dùng
    } catch (error) {
res.status(500).json({ message: 'Lỗi khi lấy dữ liệu người dùng.' });
    }
});
// Xóa người dùng
app.delete('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await User.findByIdAndDelete(userId); // Xóa người dùng trong MongoDB
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
});

// Cập nhật người dùng
app.put('/users/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
        res.status(200).json(updatedUser); // Trả về người dùng đã được cập nhật
    } catch (error) {
        res.status(500).json({ message: 'Error updating user' });
    }
});

const Class = mongoose.model('Class', new mongoose.Schema({
    name: String,
    teacher: String,
    description: String,
    code: String, // Mã lớp học duy nhất
}));

// Thêm lớp học
app.post('/create-class', async (req, res) => {
    const { name, teacher, description } = req.body;
    try {
        const newClass = new Class({ name, teacher, description, code: name.replace(/\s+/g, '').toUpperCase() });
        await newClass.save();
        res.status(201).json({ message: 'Lớp học đã được tạo!', class: newClass });
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi khi tạo lớp học.' });
    }
});

// Tham gia lớp học
app.post('/join-class', async (req, res) => {
    const { code } = req.body;
    try {
        const classFound = await Class.findOne({ code });
        if (!classFound) {
            return res.status(404).json({ message: 'Không tìm thấy lớp học với mã này.' });
        }
        res.status(200).json(classFound); // Trả về thông tin lớp học
    } catch (error) {
        res.status(500).json({ message: 'Có lỗi khi tham gia lớp học.' });
    }
});





app.listen(3500, () => {
    console.log('Server is running on port 3500');
});