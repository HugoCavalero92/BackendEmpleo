const express = require('express');
const cors = require('cors');

const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extends:true}))

// routes
app.use('/api/ofertas', require('./routes/ofertas'));
app.use('/api/hojadevida', require('./routes/hojadevida'));

module.exports = app;