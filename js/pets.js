const loadCategory = async () => {
    try {
        const response = await fetch("https://fluffypaw-imsay3m.koyeb.app/pet/category/");
        const category = await response.json();
        // console.log(category)
        category.forEach((item) => {
            const parent = document.getElementById("categories")
            const li = document.createElement("li");
            li.classList.add("dropdown-item");
            // li.innerText = item?.name
            li.innerHTML = `<li onclick="loadPetsList('${item.slug}')">${item.name}</li>`;
            parent.appendChild(li);
        })
    } catch (err) {
        console.log(err.message);
        console.log(err);
    }
}

//loading pets list
const loadPetsList = async (slug = null) => {
    document.getElementById("cards-nodata").style.display = "none"
    document.getElementById("pet-list-cards").innerHTML = "";
    try {
        const response = await fetch(`https://fluffypaw-imsay3m.koyeb.app/pet/list/?categories__slug=${slug ? slug : ""}`);
        const pets = await response.json();
        // console.log(pets)
        if (pets.length > 0) {
            displayPetsList(pets);
        }
        else {
            document.getElementById("pet-list-cards").innerHTML = "";
            document.getElementById("cards-nodata").style.display = "block"
        }
    } catch (err) {
        console.log(err.message);
        console.log(err);
    }
};



const displayPetsList = (pets) => {
    pets.forEach(pet => {
        let cat;
        const DateOfBirth = pet.date_of_birth;
        const yearOfBirth = new Date(DateOfBirth).getFullYear();
        const loadCategory = () => {
            try {
                fetch("https://fluffypaw-imsay3m.koyeb.app/pet/category/")
                    .then(res => res.json())
                    .then(category => {
                        // console.log(category)
                        category.forEach((item) => {
                            if (pet.categories[0] == item.id) {
                                // console.log(item)
                                cat = item.name
                                const parent = document.getElementById("pet-list-cards")
                                const div = document.createElement("div")
                                div.classList.add("col-lg-4", "col-md-6");
                                div.innerHTML =
                                    `
                                <div class="adoption-shop-item">
                                    <div class="adoption-shop-thumb">
                                        <img src=${pet.image} alt="">
                                        <a href="pet-details.html?id=${pet.id}" class="btn">Adoption <img src="img/icon/w_pawprint.png"
                                                alt=""></a>
                                    </div>
                                    <div class="adoption-shop-content">
                                        <h4 class="title"><a href="pet-details.html?id=${pet.id}">${pet.name}</a></h4>
                                        <div class="adoption-meta">
                                            <ul>
                                                <li><i class="fas fa-cog"></i><a href="#">${cat}</a></li>
                                                <li><i class="far fa-calendar-alt"></i> Birth : ${yearOfBirth}</li>
                                            </ul>
                                        </div>
                                        <div class="adoption-rating">
                                            <ul>
                                                <li class="price">Total Price : <span>${(pet.price == 0) ? `Free` : pet.price}</span></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                `
                                parent.appendChild(div)
                            }
                        })
                    })
            } catch (err) {
                console.log(err.message);
                console.log(err);
            }
        }
        loadCategory()

    });
}

loadCategory()
loadPetsList()