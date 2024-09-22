document.getElementById("logout-link").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent default anchor behavior
    
    // Example logout logic:
    // 1. Clear any stored session or user data (if any)
    localStorage.removeItem("userSession"); // Example: Clear user session from local storage

    // 2. Redirect to a login page or home page after logging out
    window.location.href = "login.html"; // Redirect to login page or wherever appropriate
});
