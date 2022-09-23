const express = require('express');
require('express-async-errors');
const cors = require('cors');

const errorHandle = require('../middlewares/errorHandle');

const loginRoute = require('../routes/login');
const registerRoute = require('../routes/register');
const productsRoute = require('../routes/products');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/images', express.static('public'))

app.get('/coffee', (_req, res) => res.status(418).end());

app.use('/login', loginRoute);
app.use('/register', registerRoute);
app.use('/customer/products', productsRoute);

app.use(errorHandle);

module.exports = app;
