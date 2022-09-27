const { Router } = require('express');
const SaleController = require('../controllers/sale');

const sale = Router();

sale.route('/').post(SaleController.create);

module.exports = sale;