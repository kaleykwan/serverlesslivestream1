# Technologies

### Azure Services

**HTTP Trigger**
- the HTTP trigger will send the information from the form to be stored in a database in Cosmos DB
- the HTTP trigger will connect with a database in Cosmos DB to store information that will be used so the timer trigger knows when to run

**Timer Trigger**
- the timer trigger will check the time every minute and when the time matches the start time or end time a user inputs, it will run and send a text message notification
- The timer trigger will interact with the database to check the current time against stored start and end times, and interact with the Twilio API to trigger it and send a text notification

**Cosmos DB**
- Cosmos DB will store the information a user inputs into the form (name, start time, end time, phone number)
- The trigger timer will check the time and if the time matches either the start time or end time in the database, the trigger timer will send a text

### APIs

**Twilio**
- Twilio will be used to send text notifications to the user to notify them of when their time starts and when their block of time ends
- Twilio will be triggered by the timer trigger function (when the time matches one of the times in the database) to send a text message to the user's phone number

### Packages/Libraries/Databases

**@azure/cosmos**
- this package will allow me to use Cosmos DB to store user information
- this package will be used in the HTTP trigger to store information in the database

### Front-end Languages

**HTML**
- HTML will be used to create the form that the user will use to input information like their name, phone number, and when they would like to start and end their time block
- the information the user puts into the form will be used to tell the timer trigger when to send the text notification

**CSS**
- CSS will be used to make the frontend of the web app (the form) look better
- it will interact with the HTML form

**JavaScript**
- JavaScript will be used to automate the form and connect it to the Azure functions
- it will connect the form information to the HTTP trigger, which will store the information in Cosmos DB

### Flowchart

![image](https://drive.google.com/uc?export=view&id=<1CNjXteo4eYaLnRNWlqZxYNzIYQURBg08FyxNVHfTZ_4>)