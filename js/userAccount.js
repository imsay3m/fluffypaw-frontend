const loadAccount = () => {
    const user_id = localStorage.getItem("user_id")
    const user_account = localStorage.getItem("user_account")
    try {
        fetch(`https://fluffypaw-backend.onrender.com/user/list/${user_id}/`)
            .then((res) => res.json())
            .then((user) => {
                console.log(user)
                try {
                    fetch(`https://fluffypaw-backend.onrender.com/user/account/${user_account}/`)
                        .then((response) => response.json())
                        .then((account) => {
                            console.log(account)
                            const parent = document.getElementById("user-account")
                            const div = document.createElement("div")
                            div.classList.add("row", "g-0", "align-items-center")
                            div.innerHTML = `
                            <div class="col-md-4">
                                <img src="${account.image}" class="img-fluid rounded" alt="">
                            </div>
                            <div class="col-md-8">
                                <div class="card-body">
                                    <h4 class="card-title mb-1">Name: ${user.first_name} ${user.last_name}</h5>
                                        <h5 class="card-text mb-1"><small class="fw-bold text-info">Username:
                                                ${user.username}</small></h5>
                                        <h6 class="card-text">Email: ${user.email}</h6>
                                        <h6 class="card-text">Balance: ${account.balance}</h6>
                                        <a href="#" class="btn btn-sm btn-primary mb-3">Edit Account</a>
                                        <a href="#" class="btn btn-sm btn-primary mb-3">Change
                                            Password</a>
                                </div>
                            </div>
                        `
                            parent.appendChild(div)
                        })
                } catch (error) {
                    console.log(error)
                }
            })
    } catch (error) {
        console.log(error)
    }
}
loginRedirector()
loadAccount()