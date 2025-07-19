const { CosmosClient } = require("@azure/cosmos");
const client = new CosmosClient({ endpoint: process.env.COSMOS_DB_ENDPOINT, key: process.env.COSMOS_DB_KEY });
const database = client.database(process.env.COSMOS_DB_DATABASE_ID);
const container = database.container(process.env.COSMOS_DB_CONTAINER_ID);

module.exports = async function (context, req) {
  try {
    const uid = req.query.uid;
    const query = {
      query: "SELECT * FROM c WHERE c.uid = @uid",
      parameters: [{ name: "@uid", value: uid }]
    };
    const { resources } = await container.items.query(query).fetchAll();
    context.res = { status: 200, body: resources };
  } catch (error) {
    context.res = { status: 500, body: "Error al obtener: " + error.message };
  }
};
