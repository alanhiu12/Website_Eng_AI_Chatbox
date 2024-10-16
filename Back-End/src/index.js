const express = require('express');
const path = require('path');
const bcrypt = require("bcrypt");
const collection = require("./config");

const app = express();

// Chuyển đổi dữ liệu thành định dạng JSON
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Sử dụng EJS làm view engine
app.set("view engine", "ejs");

app.get("/", (req, res) => {
    res.render("login");
});

app.get("/signup", (req, res) => {
    res.render("signup");
});

// Đăng ký người dùng
app.post("/signup", async (req, res) => {
    const data = {
        name: req.body.username,
        password: req.body.password
    };

    try {
        // Kiểm tra nếu tên người dùng đã tồn tại trong cơ sở dữ liệu
        const existingUser = await collection.findOne({ name: data.name });

        if (existingUser) {
            return res.status(409).send('User already exists. Please choose a different username.'); // 409 Conflict
        }

        // Băm mật khẩu bằng bcrypt
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltRounds);
        data.password = hashedPassword; // Thay thế mật khẩu gốc bằng mật khẩu đã băm

        const userdata = await collection.insertMany([data]); // Sử dụng mảng cho insertMany
        console.log(userdata);
        res.status(201).send("User registered successfully."); // 201 Created
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error"); // 500 Internal Server Error
    }
});

// Đăng nhập người dùng
app.post("/login", async (req, res) => {
    try {
        const check = await collection.findOne({ name: req.body.username });
        if (!check) {
            return res.status(404).send("Username cannot be found."); // 404 Not Found
        }

        // So sánh mật khẩu đã băm từ cơ sở dữ liệu với mật khẩu văn bản
        const isPasswordMatch = await bcrypt.compare(req.body.password, check.password);
        if (!isPasswordMatch) {
            return res.status(401).send("Wrong Password."); // 401 Unauthorized
        }

        res.render("home"); // Nếu mọi thứ đều đúng
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error."); // 500 Internal Server Error
    }
});

// Định nghĩa cổng cho ứng dụng
const port = 5001; // Thay đổi sang cổng khác nếu 5000 đang được sử dụng
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
