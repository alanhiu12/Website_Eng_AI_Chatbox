const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const { User, connectDB } = require('./User'); // Ensure that this file exists
const { File } = require('./File'); // Import File schema

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
connectDB().catch(err => {
    console.error("Không thể kết nối MongoDB:", err.message);
    process.exit(1); // Dừng server nếu không kết nối được DB
});

// Route lấy tất cả người dùng
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();  // Lấy tất cả người dùng
        res.status(200).json(users);      // Trả về danh sách người dùng
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error.message);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng.', error: error.message });
    }
});

// Route xóa người dùng
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id); // Tìm và xóa người dùng
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng với ID này.' });
        }
        res.status(200).json({ message: 'Người dùng đã được xóa thành công.' });
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error.message);
        res.status(500).json({ message: 'Lỗi khi xóa người dùng.', error: error.message });
    }
});
// Route lấy tất cả người dùng
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();  // Lấy tất cả người dùng
        res.status(200).json(users);      // Trả về danh sách người dùng
    } catch (error) {
        console.error('Lỗi khi lấy danh sách người dùng:', error.message);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách người dùng.', error: error.message });
    }
});

// Route xóa người dùng
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id); // Tìm và xóa người dùng
        if (!user) {
            return res.status(404).json({ message: 'Không tìm thấy người dùng với ID này.' });
        }
        res.status(200).json({ message: 'Người dùng đã được xóa thành công.' });
    } catch (error) {
        console.error('Lỗi khi xóa người dùng:', error.message);
        res.status(500).json({ message: 'Lỗi khi xóa người dùng.', error: error.message });
    }
});
// Multer storage configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({ storage });

// Middleware kiểm tra role của người dùng (optional)
const checkRole = (allowedRoles) => (req, res, next) => {
    const { role } = req.body; // Lấy role từ body của yêu cầu
    if (!role || !allowedRoles.includes(role)) {
        return res.status(403).json({ message: 'Bạn không có quyền thực hiện hành động này.' });
    }
    next();
};

// User registration route
app.post('/register', async (req, res) => {
    const { fullname, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ fullname, email, password: hashedPassword, role });
        await newUser.save();
        res.status(201).json({ message: 'Đăng ký thành công!' });
    } catch (error) {
        console.error("Lỗi khi đăng ký người dùng:", error.message);
        if (error.code === 11000) { // Lỗi trùng lặp unique key
            return res.status(400).json({ message: 'Email đã tồn tại.' });
        }
        res.status(500).json({ message: 'Đăng ký thất bại.', error: error.message });
    }
});

// User login route
app.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log("Đang xử lý đăng nhập với email:", email);
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email không hợp lệ.' });
        }

        // Kiểm tra mật khẩu đã mã hóa
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Mật khẩu không đúng.' });
        }

        console.log("Đăng nhập thành công cho người dùng:", user);
        res.status(200).json({ message: 'Đăng nhập thành công!', user });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error.message);
        res.status(500).json({ message: 'Có lỗi xảy ra. Vui lòng thử lại.' });
    }
});

// File upload route for student
app.post('/upload-files-student', upload.array('files', 3), async (req, res) => {
    try {
        console.log("Đang xử lý upload file của học sinh: ", req.files);
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'Không có file nào được upload.' });
        }

        const fileRecords = [];

        // Lưu thông tin file vào MongoDB
        for (let file of req.files) {
            const newFile = new File({
                filename: file.filename,
                path: file.path,
                size: file.size,
                originalname: file.originalname,
            });

            await newFile.save();
            fileRecords.push(newFile);
        }

        // Trả về thông tin các file đã upload
        res.status(200).json({
            message: 'Upload files thành công!',
            files: fileRecords,
        });
    } catch (error) {
        console.error('Lỗi tải file của học sinh:', error.message);
        res.status(500).json({ message: 'Tải file thất bại', error: error.message });
    }
});

// Get all files (for student to see uploaded files)
app.get('/api/files', async (req, res) => {
    try {
        const files = await File.find();
        res.status(200).json(files);
    } catch (error) {
        console.error('Lỗi khi lấy danh sách file:', error.message);
        res.status(500).json({ message: 'Lỗi khi lấy danh sách file.', error: error.message });
    }
});

// Delete file (from both filesystem and database)
app.delete('/delete-file-student/:id', async (req, res) => {
    try {
        const fileId = req.params.id;
        const file = await File.findById(fileId);
        if (!file) {
            return res.status(404).json({ message: 'Không tìm thấy file.' });
        }

        // Xóa file từ hệ thống tệp
        fs.unlinkSync(file.path);

        // Xóa file khỏi MongoDB
        await File.findByIdAndDelete(fileId);

        res.status(200).json({ message: 'File đã được xóa thành công.' });
    } catch (error) {
        console.error('Lỗi khi xóa file:', error.message);
        res.status(500).json({ message: 'Lỗi khi xóa file.', error: error.message });
    }
});

// Announcement Model
const AnnouncementSchema = new mongoose.Schema({
    title: String,
    message: String,
    createdAt: { type: Date, default: Date.now },
});

const Announcement = mongoose.model('Announcement', AnnouncementSchema);

// Announcement routes

// Save new announcement
app.post('/api/announcements', async (req, res) => {
    const { title, message } = req.body;

    if (title && message) {
        try {
            const newAnnouncement = new Announcement({ title, message });
            await newAnnouncement.save();

            const history = await Announcement.find();
            res.status(200).json({ message: 'Thông báo đã được thêm thành công!', history });
        } catch (error) {
            console.error('Error saving announcement:', error);
            res.status(500).json({ message: 'Lỗi khi lưu thông báo.', error: error.message });
        }
    } else {
        res.status(400).send('Thông báo không hợp lệ.');
    }
});

// Get all announcements
app.get('/api/announcements', async (req, res) => {
    try {
        const announcements = await Announcement.find();
        res.status(200).json(announcements);
    } catch (error) {
        console.error('Error fetching announcements:', error);
        res.status(500).json({ message: 'Lỗi khi lấy thông báo.', error: error.message });
    }
});

// Delete announcement
app.delete('/api/announcements/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Announcement.findByIdAndDelete(id);
        res.status(200).json({ message: 'Thông báo đã được xóa.' });
    } catch (error) {
        console.error('Error deleting announcement:', error);
        res.status(500).json({ message: 'Lỗi khi xóa thông báo.', error: error.message });
    }
});
// Update password
app.put('/update-password', async (req, res) => {
    const { userId, currentPassword, newPassword } = req.body;

    if (!userId || !currentPassword || !newPassword) {
        return res.status(400).json({ message: 'Missing required fields.' });
    }

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Incorrect current password.' });
        }

        if (currentPassword === newPassword) {
            return res.status(400).json({ message: 'New password cannot be the same as current password.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password updated successfully!' });
    } catch (error) {
        console.error('Error updating password:', error.message);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
});
// Start server
const PORT = process.env.PORT || 3500;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
