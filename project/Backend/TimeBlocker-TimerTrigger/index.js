const CosmosClient = require("@azure/cosmos").CosmosClient;
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioClient = require('twilio')(accountSid, authToken);

const config = {
    endpoint: process.env.ENDPOINT2,
    key: process.env.KEY2,
    databaseId: "TimeBlocker",
    containerId: "data",
    partitionKey: { kind: "Hash", paths: ["/formdata"] }
};


module.exports = async function (context, myTimer) {
    //access Cosmos DB container
    var { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const { database } = await client.databases.createIfNotExists({ id: "TimeBlocker" });
    console.log(database.id);
    const { container } = await database.containers.createIfNotExists({ id: "data" });
    console.log(container.id);

    //call current time
    var today = new Date();
    var time = String(today.getHours()).padStart(2, '0') + ":" + String(today.getMinutes()).padStart(2, '0');
    console.log(time)

    //call a list of start times from database that match the current time
    const startTime = await container.items
        .query({
            query: "SELECT * from c WHERE c.startTime = @currentTime",
            parameters: [{ name: "@currentTime", value: time }]
        })
        .fetchAll();
    const sTime = startTime.resources

    //call a list of end times from database that match the current time
    const endTime = await container.items
        .query({
            query: "SELECT * from c WHERE c.endTime = @currentTime",
            parameters: [{ name: "@currentTime", value: time }]
        })
        .fetchAll();
    const eTime = endTime.resources

    let message = ''

    //use Twilio to send a text message if start time matches current time
    for (item in sTime) {
        message = "Hello, " + sTime[item].name + "! The time block for this task begins now."
        twilioClient.messages
            .create({
                body: message,
                from: '+16467592759',
                to: sTime[item].phonenumber
            })
            .then(message => console.log(message.sid));
    }
    
    //use Twilio to send a text message if end time matches current time
    for (item in eTime) {
        message = "Hello, " + eTime[item].name + "! The time block for this task ends now."
        twilioClient.messages
        .create({
            body: message,
            from: '+16467592759',
            to: eTime[item].phonenumber
        })
        .then(message => console.log(message.sid));
    }
}
