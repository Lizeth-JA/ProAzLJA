const { CosmosClient } = require("@azure/cosmos");

const endpoint = process.env.COSMOS_DB_ENDPOINT;
const key = process.env.COSMOS_DB_KEY;
const client = new CosmosClient({ endpoint, key });
const databaseId = "reservas";
const containerId = "reservas";

module.exports = async function (context, req) {
  if (req.method !== "POST") {
    context.res = { status: 405, body: "Método no permitido" };
    return;
  }

  const { nombre, fecha, email } = req.body;

  try {
    const { container } = client.database(databaseId).container(containerId);
    const newItem = { id: Date.now().toString(), nombre, fecha, email };
    await container.items.create(newItem);

    context.res = { status: 200, body: { mensaje: "Reserva guardada" } };
  } catch (error) {
    context.res = { status: 500, body: `Error: ${error.message}` };
  }
};
