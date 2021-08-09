# TimeBlocker

## About Me

Hi, my name is Kaley! I'm a rising senior in high school from the Bay Area. 
I like reading, swimming, and stressing over college applications. I also have midlife crises over climate change about once a month.  

## The Premise

The TimeBlocker app is intended to automate the "timeblocking" productivity method for users. For example, if you have math homework, you would block out an hour of time for that. Other tasks would also be allotted a certain amount of time. The idea is that the user ends up with a concrete schedule for the day, instead of an open-ended to-do list. TimeBlocker would make it easy for the user to remember when a task's block of time starts and ends, by sending the user a text message notification.

## Tools used

For this project, I used VSCode to build out the frontend and backend, through multiple features within Microsoft Azure. These included HTTP Trigger functions, Timer Trigger functions, and Cosmos DB. 

## Step by step (with code snippets)

To build this app, we will start with the frontend, a form that the user will see and input information into. This will require three languages: HTML, JavaScript, and CSS. However, only the first two are necessary; CSS is simply used to make the web app look more aesthetic. 

Here is the code to build the HTML form:
```HTML
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width">
    <title>TimeBlocker</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
      <div class="form">
        <h1 id="h1">TimeBlocker</h1>
              <form id="myform" onsubmit="formData();return false" enctype="multipart/form-data">
                  <input type="text" id="username" name="name" placeholder="First Name"/><br>
                  <input type="time" id="startTime" name="startTime" placeholder="Task Start Time"/><br>
                  <input type="time" id="endTime" name="endTime" placeholder="Task End Time"/><br>
                  <input type="text" pattern="[0-9]{10}" id="phonenumber" name="phonenumber" placeholder="Phone Number"/><br>
                  <input id="button" value="Submit" type="submit" />
              </form>
              <br/>
        </div>
    </body>  

    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
    <!-- <script>window.jQuery || document.write('<script src="../../assets/js/vendor/jquery.min.js"><\/script>')</script> -->
     
    <script src="script.js"></script>

</html>
```
Now we have created the form that the user will see. It has several input boxes for the user's name, start and end times, and their phone number. We will be using JavaScript in order to send this form data to our first Azure function.

Here is the code to send the form data:
```javascript
function formData() {
    var name = document.getElementById("username").value
    var startTime = document.getElementById("startTime").value
    var endTime = document.getElementById("endTime").value
    var phonenumber = document.getElementById("phonenumber").value

    let url = //your function URL
    const response = fetch(url, {
        method: 'POST',
        body: JSON.stringify({name: name, startTime: startTime, endTime: endTime, phonenumber: phonenumber}),
    })

    console.log(response)
    $('#output').text("Check your phone for notifications!")
}
```
We have the web app and the data. Now it's time to build the backend, which will manipulate this data and ultimately send a text message notification to the user, notifying them of the start and end times of their task.

There are two Azure functions involved in the backend. The first is an HTTP Trigger function. This is the function that the JavaScript from above sent the form data to. Now this function will send that same data to Cosmos DB, a database to store structured data. First, the code will access the container you created in the database. Then it will create a new item to be stored in that container, and the item will contain the form data input by the user.

Here is the code to store the form data in Cosmos DB:
```javascript
const CosmosClient = require("@azure/cosmos").CosmosClient;
const querystring = require('querystring');

const config = {
    endpoint: process.env.ENDPOINT2,
    key: process.env.KEY2,
    databaseId: "TimeBlocker",
    containerId: "data",
    partitionKey: {kind: "Hash", paths: ["/formdata"]}
  };
  
module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    
    let items = await createDocument(req.body)
  
    console.log(items)
    context.res={
        body: null
    }
}

async function create(client) {
    const { database } = await client.databases.createIfNotExists({
        id: config.databaseId
    });
    
    const { container } = await client
    .database(config.databaseId)
    .containers.createIfNotExists(
        { id: config.containerId, key: config.partitionKey },
        { offerThroughput: 400 }
    );

}

async function createDocument(newItem) {
    var { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({endpoint, key});
    const database = client.database(databaseId);
    const container = database.container(containerId);
    await create(client, databaseId, containerId);
 
    const {resource: createdItem} = await container.items.create(newItem);

    return createdItem
}
```
We are almost done! The second Azure function necessary to complete the backend is a Timer Trigger function that will run every minute. This function will check the start times and end times in the database against the current time (hence why it must run every minute). If there is a match, the function will use the Twilio API to send a text message to the user, notifying them that their task either starts right now or ends right now. 

Here is the code to send a text message notification:
```javascript
const CosmosClient = require("@azure/cosmos").CosmosClient;
const accountSid = "AC8f903c0def61794a5f0cd7ac190ff372";
const authToken = "d2082f9e4007a406e01a14275b029f15";
const twilioClient = require('twilio')(accountSid, authToken);

const config = {
    endpoint: process.env.ENDPOINT2,
    key: process.env.KEY2,
    databaseId: "TimeBlocker",
    containerId: "data",
    partitionKey: { kind: "Hash", paths: ["/formdata"] }
};

module.exports = async function (context, myTimer) {
    var { endpoint, key, databaseId, containerId } = config;
    const client = new CosmosClient({ endpoint, key });
    const { database } = await client.databases.createIfNotExists({ id: "TimeBlocker" });
    console.log(database.id);
    const { container } = await database.containers.createIfNotExists({ id: "data" });
    console.log(container.id);

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
    console.log(sTime)

    //call a list of end times from database that match the current time
    const endTime = await container.items
        .query({
            query: "SELECT * from c WHERE c.endTime = @currentTime",
            parameters: [{ name: "@currentTime", value: time }]
        })
        .fetchAll();
    const eTime = endTime.resources

    let message = ''

    for (item in sTime) {
        message = "Hello, " + sTime[item].name + "! The time block for this task begins now."
        console.log(item)
        console.log(message)
        twilioClient.messages
            .create({
                body: message,
                from: '+16467592759',
                to: sTime[item].phonenumber
            })
            .then(message => console.log(message.sid));
    }
    
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
```
After you deploy this function, head to twilio.com and create an account. Once your account is made, create a new number and place the function URL into the "Webhook" box under the Messaging section. Then, every time the timer trigger function is called, that Twilio number will send the text message to the user and notify them. 

## Challenges + lessons learned

Most of these tools were entirely new concepts to me, so building this web app was a really fun challenge and a really great opportunity to learn more about Serverless and Azure functions!

## Thanks and Acknowledgements
Thank you to BitProject for hosting such a fun and educational camp, to my instructors for being patient and helpful whenever my code deigned not to work, and especially to my mentor for 1) letting me get you hooked on Manifest and 2) readily helping me debug every problem.