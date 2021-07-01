const querystring = require('querystring');

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    const queryObject = querystring.parse(req.body);
    //random comment
    
    var url = queryObject.MediaUrl0
    
    let resp = await fetch(url, {
        method: 'GET',
    })

    // receive the response
    let data = await resp.arrayBuffer()
    // we are receiving it as a Buffer since this is binary data

    var result = await analyzeImage(data)

    let age = result[0].faceAttributes.age

    let id = 0

    if (age >=5 && age <=25) {
        id = "GenZ"
    } else if (age >=26 && age <=41) {
        id = "GenY"
    } else if (age >=42 && age <=57) {
        id = "GenX"
    } else if (age >=58 && age <=76) {
        id = "BabyBoomers"
    } else {
        id = "Unknown"
    }

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: id
    };
}
   
async function analyzeImage(img){
    const subscriptionKey = process.env.SUBSCRIPTIONKEY;
    const uriBase = process.env.ENDPOINT + '/face/v1.0/detect';
    
    let params = new URLSearchParams({
        'returnFaceId': 'true',
        'returnFaceAttributes': 'age'
    })
    
    // making the post request
    let resp = await fetch(uriBase + '?' + params.toString(),{
        method: 'POST',
        body: img,
        // img is the parameter inputted
        headers: {
            'Content-Type' : 'application/octet-stream',
            'Ocp-Apim-Subscription-Key' : subscriptionKey
        }
    })
    
    // receive the response
    let data = await resp.json();

    return data;  
}






