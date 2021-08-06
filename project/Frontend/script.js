function formData() {
    var name = document.getElementById("username").value
    var startTime = document.getElementById("startTime").value
    var endTime = document.getElementById("endTime").value
    var phonenumber = document.getElementById("phonenumber").value

    let url = "http://localhost:7071/api/TimeBlocker-HTTPTrigger"
    const response = fetch(url, {
        method: 'POST',
        body: JSON.stringify({name: name, startTime: startTime, endTime: endTime, phonenumber: phonenumber}),
    })

    console.log(response)
    $('#output').text("Check your phone for notifications!")
}
