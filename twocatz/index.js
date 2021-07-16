const fetch = require('node-fetch')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    async function getCat() {
        let resp = await fetch("https://251a9d93-8c22-472d-b5c5-c0b013b15125.mock.pstmn.io/bitproject", {
            method: 'GET'
        });
        
        let data = await resp.arrayBuffer()
        // we need to receive it as a buffer since this is an image we are receiving from the API
        // Buffer?? https://developer.mozilla.org/en-US/docs/Web/API/Blob    
        var base64data = Buffer.from(data).toString('base64')
        //put what you want to turn into base64 inside "originaldata"
        //"originaldata" will be encoded in base64. 
        
        return base64data
    }
    
    let catpic1 = await getCat()
    let catpic2 = await getCat()
    let catpic3 = await getCat()
    let catpic4 = await getCat()

    function getNames() {
        var names = ["Shreya", "Emily", "Fifi", "Beau", "Evelyn", "Julia", "Daniel", "Fardeen"]
        var resultname = names[random_value]

        return resultname
    }

    let name1 = getNames()
    let name2 = getNames()
    let name3 = getNames()
    let name4 = getNames()

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: {
            cat1: catpic1,
            cat2: catpic2,
            cat3: catpic3,
            cat4: catpic4,
            names: [name1, name2, name3, name4]
        }
    };
}