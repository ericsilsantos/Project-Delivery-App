const models = require('../database/models');
const ErrorsCode = require('../errors/ErrorsCode');

class SaleService {
  static async create(objSale) {
    const result = await models.Sale.create(objSale);
    return result;
  }

  static async getAll() {
    const result = await models.Sale.findAll();
    if (!result) throw new ErrorsCode('', '', 404);
    return result;
  }

  static async getById(id) {
    const result = await models.Sale.findOne({
      where: { id },
      include: [{
        model: models.Product,
        as: 'product',
        // through: { attributes: [] }
      }],
    });
    return result;
  }
}

module.exports = SaleService;