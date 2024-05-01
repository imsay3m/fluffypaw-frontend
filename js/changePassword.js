const changePassword = (event) => {
    event.preventDefault()
    if (!isAuthenticated()) {
        loginRedirector()
    }
    const user_id = localStorage.getItem("fluffypaw_user_id")
    const old_password = getValue("old-password")
    const password = getValue("password")
    const password2 = getValue("password2")
    console.log(user_id, old_password, password, password2)
    if (password === password2) {
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            try {
                fetch(`https://fluffypaw-imsay3m.koyeb.app/user/change_password/`, {
                    method: "POST",
                    headers: { "content-type": "application/json" },
                    body: JSON.stringify({ user_id, old_password, password, password2 }),
                })
                    .then((response) => {
                        if (response.status === 200) {
                            window.location.href = "user-account.html";
                        } else {
                            console.log("Password Changing failed with status code:", response.status);
                        }
                    })
            } catch (error) {
                console.log(error)
            }
        }
        else {
            showPasswordAlert("Password must contain at least one letter, one digit, and be at least 8 characters long.")
        }
    }

}


const showPasswordAlert = (message) => {
    const parent = document.getElementById("error-container")
    parent.innerHTML = ""
    const alertDiv = document.createElement("div");
    alertDiv.innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                            <span>${message}</span>
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div>
                        `
    parent.appendChild(alertDiv)
}