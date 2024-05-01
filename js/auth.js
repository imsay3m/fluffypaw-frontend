const getToken = localStorage.getItem('fluffypaw_token');
if (getToken) {
    // User is authenticated, redirect to userDetails page
    window.location.href = "user-account.html";
}

const handleSignup = (event) => {
    event.preventDefault()
    // console.log("hello")
    const username = getValue("username")
    const password = getValue("password")
    const confirm_password = getValue("confirm_password")
    const first_name = getValue("first_name")
    const last_name = getValue("last_name")
    const email = getValue("email")
    const image = document.getElementById("image").files[0]
    // console.log(info)
    if (password === confirm_password) {
        if (/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
            if (username) {
                if (email) {
                    try {
                        const formData = new FormData();
                        formData.append("username", username);
                        formData.append("first_name", first_name);
                        formData.append("last_name", last_name);
                        formData.append("email", email);
                        formData.append("password", password);
                        formData.append("confirm_password", confirm_password);
                        formData.append("image", image); // Append the image file to the form data
                        fetch("https://fluffypaw-imsay3m.koyeb.app/user/register/", {
                            method: "POST",
                            body: formData,
                        })
                            .then((response) => {
                                if (response.status === 200) {
                                    // window.location.href = "user-login.html";
                                    console.log(response.statusText);
                                } else {
                                    console.log("Registration failed with status code:", response.status);
                                    showPasswordAlert(response.statusText)
                                }
                            })

                    } catch (err) {
                        console.log(err.message)
                        console.log(err)
                    }
                }
                else {
                    showPasswordAlert("Image is required.")
                }
            }
            else {
                showPasswordAlert("Username is required.")
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
    // console.log(username, password);
    if (username && password) {
        fetch("https://fluffypaw-imsay3m.koyeb.app/user/login/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password })
        })
            .then(res => res.json())
            .then((data) => {
                if (data.token && data.user_id) {
                    localStorage.setItem("fluffypaw_token", data.token);
                    localStorage.setItem("fluffypaw_user_id", data.user_id);
                    const user_id = data.user_id
                    fetch(`https://fluffypaw-imsay3m.koyeb.app/user/account/?user_id=${user_id}`)
                        .then(res => res.json())
                        .then((data) => {
                            if (data && data.length > 0 && data[0].id) {
                                localStorage.setItem("fluffypaw_user_account", data[0].id);
                                window.location.href = "user-account.html";
                            }
                        })
                }
                else {
                    showPasswordAlert("Invalid username or password.")
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

