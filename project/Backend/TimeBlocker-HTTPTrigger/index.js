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