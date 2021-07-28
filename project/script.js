function formData() {
    var name = document.getElementById("username")
    var startTime = document.getElementById("startTime")
    var endTime = document.getElementById("endTime")
    var phonenumber = document.getElementById("phonenumber")

    let url = ""
    const response = fetch(url, {
        method: 'POST',
        body: JSON.stringify({name: name, startTime: startTime, endTime: endTime, phonenumber: phonenumber}),
    });
}
