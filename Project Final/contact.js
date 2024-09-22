document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Ngăn việc gửi form mặc định

        // Thực hiện gửi form bằng AJAX (ở đây chỉ mô phỏng)
        // Bạn có thể thay thế đoạn này bằng code gửi form thực sự nếu cần

        // Sau khi gửi thành công
        alert('Thông tin đã được gửi thành công!');
    });
});

// Handle logout functionality
document.getElementById('logout-link').addEventListener('click', function(event) {
    event.preventDefault();
    // Clear login state
    localStorage.removeItem("loggedIn");
    // Redirect to login page
    window.location.href = "login.html";
});