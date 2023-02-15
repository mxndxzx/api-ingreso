const express = require('express');
const bodyParser = require('body-parser');
const v1Router = require('./src/v1/routes/ingreso.routes');

require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());
app.get('/', (req,res) => {
    res.send(`<p>Server working</p>`);
});

app.use('/api/v1/', v1Router);

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});