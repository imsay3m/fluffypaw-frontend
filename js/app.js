const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return token !== null;
};

// Function to toggle visibility of profile and logout button based on authentication
const toggleAuthElements = () => {
    const profile = document.getElementById('profile-button');
    const logout = document.getElementById('logout-button')
    const loginButton = document.getElementById('login-button');
    const registerButton = document.getElementById('register-button');
    if (isAuthenticated()) {
        profile.style.display = 'block'; // Show profile dropdown
        logout.style.display = 'block'
        loginButton.style.display = "none";  // Hide login button
        registerButton.style.display = "none"; // Hide registration button
    } else {
        profile.style.display = 'none'; // Hide profile dropdown
        logout.style.display = 'none'
        loginButton.style.display = "block";   // Show login button
        registerButton.style.display = "block";  // Show registration button
    }
};

// Call the function to toggle visibility on page load
window.onload = toggleAuthElements;

const handleLogout = () => {
    const token = localStorage.getItem('token')
    fetch("https://fluffypaw-backend.onrender.com/user/logout/", {
        method: "GET",
        authorization: `Token ${token}`,
        headers: { "content-type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            localStorage.removeItem('token')
            localStorage.removeItem('user_id')
            window.location.href = "index.html"; // Redirect to the home page after successful logout
        })
}