const handleLogout = () => {
    loginRedirector()
    const token = localStorage.getItem('fluffypaw_token')
    fetch("https://fluffypaw-imsay3m.koyeb.app/user/logout/", {
        method: "GET",
        authorization: `Token ${token}`,
        headers: { "content-type": "application/json" },
    })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            localStorage.removeItem('fluffypaw_token')
            localStorage.removeItem('fluffypaw_user_id')
            localStorage.removeItem('fluffypaw_user_account')
            window.location.href = "index.html"; // Redirect to the home page after successful logout
        })
}