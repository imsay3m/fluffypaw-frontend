const loadCategory = async () => {
    loginRedirector()
    try {
        const response = await fetch("https://fluffypaw-backend.onrender.com/pet/category/");
        const category = await response.json();
        // console.log(category)
        category.forEach((item) => {
            const parent = document.getElementById("categories")
            const option = document.createElement("option")
            option.classList.add("dropdown-item")
            option.value = item?.id
            option.innerText = item?.name
            parent.appendChild(option)
        })
    } catch (err) {
        console.log(err.message);
        console.log(err);
    }
}

const addPet = (e) => {
    e.preventDefault();
    loginRedirector()
    const name = getValue("name")
    const description = getValue("description")
    const date_of_birth = getValue("date_of_birth")
    const image = document.getElementById("image").files[0]
    const price = parseInt(getValue("price"))
    const adopter = null
    const added_by = parseInt(localStorage.getItem('user_id'))
    const categories = parseInt(getValue("categories"))

    try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("date_of_birth", date_of_birth);
        formData.append("image", image); // Append the image file to the form data
        formData.append("price", price);
        formData.append("adopter", adopter);
        formData.append("added_by", added_by);
        formData.append("categories", categories);
        fetch("https://fluffypaw-backend.onrender.com/pet/list/", {
            method: "POST",
            body: formData
        })
            .then((response) => {
                if (response.status === 200) {
                    window.location.href = "pets.html";
                } else {
                    console.log("POST Request failed with status code:", response.status);
                }
            })
    } catch (err) {
        console.log(err.message);
        console.log(err);
    }
}

loadCategory();