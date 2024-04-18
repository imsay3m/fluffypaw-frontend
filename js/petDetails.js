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
const handlePetDetails = async () => {
    const id = getParams();

    try {
        const response = await fetch(`https://fluffypaw-backend.onrender.com/pet/list/${id}/`)
        const pet = await response.json();
        let cat;
        const loadCategory = () => {
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
                                        <a href="#" class="btn">Apply Today <img src="img/icon/w_pawprint.png" alt=""></a>`}
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
                                    <div class="my-3">
                                        <div class="alert alert-primary" role="alert">Total Reviews: {{reviews|length}}</div>
                                        {% if reviews %}
                                        {% for review in reviews %}
                                        <div class="card mb-1">
                                            <div class="card-header">
                                                <h5>{{review.user.first_name}}</h5>
                                                <p class="card-title text-info">{{review.user.email}} <small
                                                        class="blockquote-footer">Reviewed
                                                        On: <cite class="text-primary"
                                                            title="Source Title">{{review.created_on}}</cite>
                                                    </small></p>
                                            </div>
                                            <div class="card-body">
                                                <h6 class="card-text">{{review.body}}</h6>
                                            </div>
                                        </div>
                                        {% endfor %}
                                        {% endif %}
                                    </div>
                                    `
                                parent.appendChild(div)
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
        console.log(pet)

    } catch (err) {
        console.log(err.message);
        console.log(err);
    }
}
handlePetDetails();