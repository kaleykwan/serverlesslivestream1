async function y1k3s() {
    let url = `https://hackervoicee1.azurewebsites.net/api/twocatz?code=Sx9mIujAePkMVpG8J7ybWWcSRNXRjZUEFWeDUsR42fx7BfwqvHPhvA==&name1=${document.getElementById("name1").value}&name2=${document.getElementById("name2").value}&name3=${document.getElementById("name3").value}&name4=${document.getElementById("name4").value}`

    let response = await fetch(url, {
        method: 'GET',
    })

    let result = await response.json()

    document.getElementById("image1").src = "data:image/png;base64," + result.catpic1
    document.getElementById("image2").src = "data:image/png;base64," + result.catpic2
    document.getElementById("image3").src = "data:image/png;base64," + result.catpic3
    document.getElementById("image4").src = "data:image/png;base64," + result.catpic4

    console.log("Received images")
}
