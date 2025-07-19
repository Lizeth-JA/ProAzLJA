const { CosmosClient } = require("@azure/cosmos");
const client = new CosmosClient({ endpoint: process.env.COSMOS_DB_ENDPOINT, key: process.env.COSMOS_DB_KEY });
const database = client.database(process.env.COSMOS_DB_DATABASE_ID);
const container = database.container(process.env.COSMOS_DB_CONTAINER_ID);

module.exports = async function (context, req) {
  try {
    const { uid, email, fecha, hora, laboratorio } = req.body;
    await container.items.create({ uid, email, fecha, hora, laboratorio });
    context.res = { status: 200, body: { mensaje: "Reserva registrada correctamente" } };
  } catch (error) {
    context.res = { status: 500, body: "Error al registrar: " + error.message };
  }
};
