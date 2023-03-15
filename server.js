const express = require('express');
const bodyParser = require('body-parser');
const v1Router = require('./src/v1/routes/ingreso.routes');
const errorHandler = require('errorhandler');
const cors = require("cors")


require('dotenv').config();

const app = express();
const port = process.env.PORT;

app.use(cors())

if (process.env.NODE_ENV === 'development') {
    app.use(errorHandler({ dumpExceptions: true, showStack: true }));
};
  
if (process.env.NODE_ENV === 'production') {
    app.use(errorHandler());
};

app.use(bodyParser.json());
app.get('/', (req,res) => {
    res.send(`<p>Server working</p>`);
});

app.use('/api/v1/', v1Router);

app.listen(port, () => {
    console.log(`API listening on port ${port}`);
});