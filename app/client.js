/*
La gestion des connections à une base de données c'est en fait plus complexe que se que l'on croit.
Avec un client classique les requête sont mise en file d'attente sur le serveur. un requête ne peut s'executer tant qu'une autre n'est pas terminer. Afin de régler ce souci les BDD permettent de créer un "pool" de client. Cette pool va gérer elle-même plusieur client, et chaque requête sera rediriger vers un lcient disponible pour exécuter la requête SQL le plus rapidement possible. On a rien a gérer de notre côté. Tu s'occupe de rien elle s'occupe de tout !
*/

//const { Client } = require('pg');
const { Pool } = require('pg');

// Si on ne fourni aucune information au client, il va se servir dans les variables d'environnement (PGUSER, PGDATABASE, PGHOST…)
// Ce clcient en environnement de dev se comporte exactement comme psql. Nous n'avons besoin de renseigner dans .env que la database
// const client = new Client();
const client = new Pool(
    // List des options de pool de la documentation
    // @see https://node-postgres.com/api/pool
    {
    // all valid client config options are also valid here
    // in addition here are the pool specific configuration parameters:
    // number of milliseconds to wait before timing out when connecting a new client
    // by default this is 0 which means no timeout
    connectionTimeoutMillis: 1000,
    // number of milliseconds a client must sit idle in the pool and not be checked out
    // before it is disconnected from the backend and discarded
    // default is 10000 (10 seconds) - set to 0 to disable auto-disconnection of idle clients
    idleTimeoutMillis: 1000,
    // maximum number of clients the pool should contain
    // by default this is set to 10.
    max: 5,
    ssl: {
      rejectUnauthorized: false
   }
  });