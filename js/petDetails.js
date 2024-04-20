const getParams = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const param = urlParams.get('id');
    if (!param || param.trim() === "") {
        document.getElementById("pet-details").innerHTML = `
        <div class="alert alert-danger m-5" role="alert">
            Pet ID is missing or invalid
        </div>
        `;
        return;
    }
    return param
}

const addReview = (event) => {
    event.preventDefault();
    loginRedirector();
    const body = document.getElementById("description").value;
    const pet = getParams();
    const user = localStorage.getItem("user_id");
    try {
        const formData = new FormData();
        formData.append("body", body);
        formData.append("pet", pet);
        formData.append("user", user);
        console.log(formData)
        fetch(`https://fluffypaw-backend.onrender.com/pet/review/`, {
            method: "POST",
            body: formData
        })
            .then(response => {
                if (response.ok) {  // Check if response is successful (status in the range 200-299)
                    console.log("Review submitted successfully!");
                } else {
                    console.log("POST Request failed with status code:", response.status);
                }
            })
            .catch(error => {
                console.error("Error submitting review:", error);
            })
    }
    catch (error) {
        console.log(error)
    }
}


const formattedDate = (isoString) => {
    const date = new Date(isoString);

    // Options for formatting the date and time
    const options = {
        year: 'numeric',
        month: 'short', // Use 'long' for full month name
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        // timeZoneName: 'short' // Display time zone abbreviation
    };

    // Format the date and time
    return date.toLocaleString('en-US', options);
};

const reviewerDetails = async (user_id) => {
    try {
        const response = await fetch(`https://fluffypaw-backend.onrender.com/user/list/${user_id}/`);
        const userData = await response.json();
        return userData; // Return the user data
    } catch (error) {
        console.log(error);
        return null; // Return null if there's an error
    }
};

const adoptPet = (event) => {
    event.preventDefault();
    loginRedirector()
    const pet_id = getParams();
    const user_id = localStorage.getItem("user_id");
    fetch(`https://fluffypaw-backend.onrender.com/pet/adopt/`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ pet_id, user_id })
    })
        .then((response) => {
            if (response.status == 200) {
                window.location.href = "user-account.html";
            } else {
                console.log("POST Request failed with status code:", response.status);
            }
        })
}
const handlePetDetails = async () => {
    const id = getParams();
    try {
        const response = await fetch(`https://fluffypaw-backend.onrender.com/pet/list/${id}/`)
        const pet = await response.json();
        let cat;
        const review = await fetch(`https://fluffypaw-backend.onrender.com/pet/review/?pet__id=${id}`)
        const reviews = await review.json()
        const loadCategory = async () => {
            try {
                fetch("https://fluffypaw-backend.onrender.com/pet/category/")
                    .then(res => res.json())
                    .then(category => {
                        category.forEach((item) => {
                            if (pet.categories[0] == item.id) {
                                cat = item.name
                                const parent = document.getElementById("pet-details-card")
                                const div = document.createElement("div");
                                div.classList.add("breeder-details-content")
                                div.innerHTML =
                                    `
                                    <h4 class="title">${pet.name}</h4>
                                    <p>${pet.description}</p>
                                    <div class="text-center  breeder-details-img">
                                        <img src="${pet.image}" alt="">
                                    </div>
                                    <div class="breeder-dog-info">
                                        <h4 class="title">About Bio</h4>
                                        <div class="row">
                                            <div class="col-md-3 col-sm-4 col-6">
                                                <div class="breeder-info-item">
                                                    <h6>Date of Birth:</h6>
                                                    <span>${pet.date_of_birth}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-3 col-sm-4 col-6">
                                                <div class="breeder-info-item">
                                                    <h6>Pet ID:</h6>
                                                    <span>${pet.id}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-3 col-sm-4 col-6">
                                                <div class="breeder-info-item">
                                                    <h6>Breed:</h6>
                                                    <span>${cat}</span>
                                                </div>
                                            </div>
                                            <div class="col-md-3 col-sm-4 col-6">
                                                <div class="breeder-info-item">
                                                    <h6>Price:</h6>
                                                    <span>${(pet.price == 0) ? `Free` : pet.price}</span>
                                                </div>
                                            </div>
                                        </div>
                                        ${pet.adopter != null ? `
                                        <a href="" class="btn disabled ">Already Adopted <img src="img/icon/w_pawprint.png" alt=""></a>` : `
                                        <btn type="submit" onclick="adoptPet(event)" class="btn">Apply Today <img src="img/icon/w_pawprint.png" alt=""></a>`}
                                    </div>
                                    <!-- add review section -->
                                    ${pet.adopter != null && isAuthenticated() && pet.adopter == localStorage.getItem('user_id') ? `
                                    <div class="my-3">
                                        <div class="card border-dark">
                                            <div class="card-header">
                                                <h3>Add Review</h3>
                                            </div>
                                            <div class="card-body">
                                                <form method="post">
                                                    <div class="form-group">
                                                        <label for="description">Description</label>
                                                        <textarea class="form-control" id="description" name="description" rows="3" required></textarea>
                                                    </div>
                                                    <button class="btn btn-warning" type="submit" onclick="addReview(event)">Submit</button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>` : ``}
                                    <!-- review section -->
                                    <div class="my-3" id="reviews-parent">
                                        <div class="alert alert-primary" role="alert">Total Reviews: ${reviews.length}</div>
                                    </div>
                                    `;
                                parent.appendChild(div)
                                const reviewsParent = document.getElementById("reviews-parent");
                                reviews.forEach(async (rev) => {
                                    const userData = await reviewerDetails(rev.user);
                                    const reviewCard = document.createElement("div");
                                    reviewCard.classList.add("card", "mb-1");
                                    reviewCard.innerHTML = `
                                        <div class="card-header">
                                            <h5>${userData.first_name + ' ' + userData.last_name}</h5>
                                            <p class="card-title text-info">${userData.email} <small class="blockquote-footer">Reviewed On: <cite class="text-primary" title="Source Title">${formattedDate(rev.created_on)}</cite></small></p>
                                        </div>
                                        <div class="card-body">
                                            <h6 class="card-text">${rev.body}</h6>
                                        </div>
                                    `;
                                    reviewsParent.appendChild(reviewCard);
                                });
                            }
                        })
                    })
            }
            catch (err) {
                console.log(err.message);
                console.log(err);
            }
        }
        loadCategory()
        // console.log(pet)
    } catch (err) {
        console.log(err.message);
        console.log(err);
    }
}
handlePetDetails();