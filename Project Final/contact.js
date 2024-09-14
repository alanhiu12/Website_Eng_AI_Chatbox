document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn việc gửi form mặc định

        // Thực hiện gửi form bằng AJAX (ở đây chỉ mô phỏng)
        // Bạn có thể thay thế đoạn này bằng code gửi form thực sự nếu cần

        // Sau khi gửi thành công
        alert('Thông tin đã được gửi thành công!');

        // Chuyển hướng về trang chủ
        window.location.href = 'index.html';
    });
});
