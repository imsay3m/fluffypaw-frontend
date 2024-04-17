const getToken = localStorage.getItem('token');
if (getToken) {
    // User is authenticated, redirect to userDetails page
    window.location.href = "user-account.html";
}

const handleSignup = (event) => {
    event.preventDefault()
    // console.log("hello")
    const username = getValue("username")
    const first_name = getValue("first_name")
    const last_name = getValue("last_name")
    const email = getValue("email")
    const password = getValue("password")
    const confirm_password = getValue("confirm_password")
    const image = document.getElementById("image").files[0]
    // console.log(info)
    if (password === confirm_password) {
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            try {
                const formData = new FormData();
                formData.append("username", username);
                formData.append("first_name", first_name);
                formData.append("last_name", last_name);
                formData.append("email", email);
                formData.append("password", password);
                formData.append("confirm_password", confirm_password);
                formData.append("image", image); // Append the image file to the form data
                fetch("https://fluffypaw-backend.onrender.com/user/register/", {
                    method: "POST",
                    body: formData,
                })
                    .then((response) => {
                        if (response.status === 200) {
                            window.location.href = "user-login.html";
                        } else {
                            console.log("Registration failed with status code:", response.status);
                        }
                    })

            } catch (err) {
                console.log(err.message)
                console.log(err)
            }
        }
        else {
            showPasswordAlert("Password must contain at least one letter, one digit, and be at least 8 characters long.")
        }
    } else {
        showPasswordAlert("Your passwords do not match.")
    }

}


const handleLogin = (event) => {
    event.preventDefault();
    const username = getValue("username-login");
    const password = getValue("password-login");
    console.log(username, password);
    if (username && password) {
        fetch("https://fluffypaw-backend.onrender.com/user/login/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.token && data.user_id) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user_id", data.user_id);
                    const user_id = data.user_id
                    fetch(`https://fluffypaw-backend.onrender.com/user/account/?user_id=${user_id}`)
                        .then(res => res.json())
                        .then((data) => {
                            if (data && data.length > 0 && data[0].id) {
                                localStorage.setItem("user_account", data[0].id);
                                window.location.href = "user-account.html";
                            }
                        })
                }
            })
            .catch(error => {
                console.error("Error while logging in:", error);
            });
    }
};



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

