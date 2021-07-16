const { Client } = require('pg');

// Si on ne fourni aucune information au client, il va se servir dans les variables d'environnement (PGUSER, PGDATABASE, PGHOST…)
// Ce clcient en environnement de dev se comporte exactement comme psql. Nous n'avons besoin de renseigner dans .env que la database
const client = new Client();

client.connect();

module.exports = client;