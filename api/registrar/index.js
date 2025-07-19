const { CosmosClient } = require("@azure/cosmos");

const client = new CosmosClient({
  endpoint: process.env.COSMOS_DB_ENDPOINT,
  key: process.env.COSMOS_DB_KEY
});
const database = client.database(process.env.COSMOS_DB_DATABASE_ID);
const container = database.container(process.env.COSMOS_DB_CONTAINER_ID);

module.exports = async function (context, req) {
  try {
    const { uid, email, fecha, hora, laboratorio } = req.body;

    if (!uid || !email || !fecha || !hora || !laboratorio) {
      context.res = {
        status: 400,
        body: { mensaje: "Faltan datos obligatorios" }
      };
      return;
    }

    await container.items.create({ uid, email, fecha, hora, laboratorio });

    context.res = {
      status: 200,
      body: { mensaje: "Reserva registrada correctamente" }
    };
  } catch (error) {
    context.log.error("Error al registrar:", error.message);
    context.res = {
      status: 500,
      body: { mensaje: "Error al registrar", error: error.message }
    };
  }
};