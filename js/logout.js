const handleLogout = () => {
    loginRedirector()
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
            localStorage.removeItem('user_account')
            window.location.href = "index.html"; // Redirect to the home page after successful logout
        })
}