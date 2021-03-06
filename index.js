require('dotenv').config();

const express = require('express');

const app = express();

const port = process.env.PORT || 3000;

const router = require('./app/router');

app.use(express.json())

app.use(router);

app.listen(port, _ => {
   console.log(`http://localhost:${port}`);
});