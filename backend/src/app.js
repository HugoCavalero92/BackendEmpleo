const express = require('express');
const cors = require('cors');

const app = express();

// settings
app.set('port', process.env.PORT || 4000);

// middlewares 
app.use(cors());
app.use(express.json());

// routes
app.use('/api/ofertas', require('./routes/ofertas'));
app.use('/api/hojadevida', require('./routes/hojadevida'));
app.use('/api/usuarios', require('./routes/users'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/uploads', require('./routes/uploads'));

module.exports = app;