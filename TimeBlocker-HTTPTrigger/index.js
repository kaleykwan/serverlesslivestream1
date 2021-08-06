module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    context.log(req.body)
    
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
}