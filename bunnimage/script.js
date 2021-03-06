function getImage(event) {
    event.preventDefault()
    var bunniForm = document.getElementById("myform");
    //get image and file name uploaded by user via the form
    let nameInput = document.getElementById("username")
    let fileInput = document.getElementById("image")
    let file = fileInput.files[0]; //get image

    var payload = new FormData(bunniForm);
    payload.append("file", file);
    $('#output').text("Thanks!")

    if (document.getElementById('username').value != '') {
        
        try {
            let url = "https://hackervoicee1.azurewebsites.net/api/bunnimage-upload1?code=b3ItgMNUu2Llp7wtnvSk3TQzE7L5yNJHl7bOXoZbJ11laymUbkhYmQ=="
            console.log("Image was uploaded")
            const response = fetch(url, {
                method: 'POST',
                headers: {
                    'codename': nameInput.value
                },
                body: payload,
            });
            $('#output').text("Your image has been stored successfully!")
        } catch(err) {
            $('#output').text(err)
        }
    } else {
        alert("No name error.")
    }
    
}

async function downloadImage() {
    let username = document.getElementById("downloadusername").value

    if(username != '') {
        try {
            let url = "https://hackervoicee1.azurewebsites.net/api/bunnimage-download?code=lu3aM9jMsRNDRs36AhEjmL71QzWCLZEbti9BK/TJ3b5eXeGvzZehzQ=="

            console.log("Got file name, making GET request to download image")

            fetch(url, {
                headers: {
                    username: username
                }
            })
                .then(resp => {
                    return resp.json()
                })
                .then(data => {
                    console.log(data)
                    console.log(data.downloadUri)
                    window.open(data.downloadUri, "_self")
                });
            
        } catch(err) {
            alert(err)
        }  
    } else {
        alert("No name error.")
    }
}

