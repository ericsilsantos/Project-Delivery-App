const models = require('../database/models');
const SaleProductsService = require('./saleProducts');
const ErrorsCode = require('../errors/ErrorsCode');

class SaleService {
  static async create(objSale) {
    const result = await models.Sale.create(objSale);
    return result;
  }

  static async formatedProducts(salesProducts, product) {
    const products = await Promise.all(salesProducts.map((sale, index) => {
      const prod = product.map((item) => item);
      const qty = prod[index].id === sale.productId ? sale.quantity : 0;

      const obj = {
        id: prod[index].id,
        name: prod[index].name,
        price: prod[index].price,
        urlImage: prod[index].urlImage,
        quantity: qty,
      };

      return obj;
    }));

    return products;
  }

  static async getOne(id) {
    const sale = await models.Sale.findOne({
      where: { id },
      include: [
        { association: 'user', attributes: { exclude: ['password'] } },
      ],
    });
    
    if (!sale) throw new ErrorsCode('NotFound', 'Sale not Exists', 404);

    const salesProducts = await SaleProductsService.getOne(sale.id);

    const product = await Promise.all(
      salesProducts.map(({ productId }) => models.Product.findOne({
        where: { id: productId },
        raw: true,
      })),
    );

    const products = await this.formatedProducts(salesProducts, product);

    return { sale, products };
  }
}

module.exports = SaleService;