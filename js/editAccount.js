loginRedirector()
const loadInstance = () => {
    try {
        fetch(`https://fluffypaw-imsay3m.koyeb.app/user/list/${user_id}/`)
            .then((res) => res.json())
            .then((user) => {
                // console.log(user)
                document.getElementById('first-name').value = user.first_name
                document.getElementById('last-name').value = user.last_name
                document.getElementById('email').value = user.email
                try {
                    fetch(`https://fluffypaw-imsay3m.koyeb.app/user/account/${user_account}/`)
                        .then((response) => response.json())
                        .then((account) => {
                            // console.log(account)
                            // document.getElementById('image').value = account.image
                            document.getElementById('image-preview').src = account.image
                        })
                } catch (error) {
                    console.log(error)
                }
            })
    } catch (error) {
        console.log(error)
    }
}
const user_id = localStorage.getItem('fluffypaw_user_id');
const user_account = localStorage.getItem('fluffypaw_user_account');

if (user_id && user_account) {
    loadInstance();
} else {
    console.log('user_id or user_account is missing.');
}

const editAccount = async (event) => {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;

    const formData = new FormData();
    formData.append('first_name', firstName);
    formData.append('last_name', lastName);
    formData.append('email', email);
    // Check if a new image file was selected
    const imageInput = document.getElementById('image');
    if (imageInput.files.length > 0) {
        formData.append('image', imageInput.files[0]);
    }
    try {
        const response = await fetch(`https://fluffypaw-imsay3m.koyeb.app/user/edit_profile/${user_id}/`, {
            method: 'PATCH',
            body: formData,
        });
        const data = await response.json();
        console.log('Account updated:', data);
        // window.location.href = "user-account.html";
    } catch (error) {
        console.log('Error updating account:', error);
    }
};


// const editAccount = async (event) => {
//     event.preventDefault();

//     const formData = new FormData();
//     formData.append('first_name', document.getElementById('first-name').value);
//     formData.append('last_name', document.getElementById('last-name').value);
//     formData.append('email', document.getElementById('email').value);

//     // Check if a new image file was selected
//     const imageInput = document.getElementById('image');
//     if (imageInput.files.length > 0) {
//         formData.append('image', imageInput.files[0]);
//     } else {
//         const imagePreview = document.getElementById('image-preview').src;
//         // formData.append('image', imagePreview);
//     }

//     try {
//         const response = await fetch(`https://fluffypaw-imsay3m.koyeb.app/user/edit_profile/${user_id}/`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: formData,
//         });
//         const data = await response.json();
//         console.log('Account updated:', data);
//         // window.location.href = "user-account.html";
//     } catch (error) {
//         console.log('Error updating account:', error);
//     }
// };
