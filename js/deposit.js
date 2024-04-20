loginRedirector();
const handleDeposit = (event) => {
    event.preventDefault()
    loginRedirector()
    const amount = parseInt(getValue("amount"));
    const account = parseInt(localStorage.getItem('user_account'))
    console.log(amount, account)
    if (!isNaN(amount) && !isNaN(account)) {
        var responseClone;
        fetch("https://fluffypaw-backend.onrender.com/transaction/deposit/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ amount, account })
        })
            .then(function (response) {
                responseClone = response.clone(); // 2
                return response.json();
            })
            .then(function (data) {
                window.location.href = "user-account.html"
            }, function (rejectionReason) { // 3
                console.log('Error parsing JSON from response:', rejectionReason, responseClone); // 4
                responseClone.text() // 5
                    .then(function (bodyText) {
                        console.log('Received the following instead of valid JSON:', bodyText); // 6
                    });
            });
    } else {
        console.log("Invalid amount or account number.");
    }
}