const Joi = require('joi');
const ErrorsCode = require('../errors/ErrorsCode');

class Validate {
  static async loginBody(body) {
    try {
      const schema = Joi.object({
        email: Joi.string().required().email().max(100),
        password: Joi.string().required().min(6).max(32),
      });
      
      const result = await schema.validateAsync(body);
      return result;
    } catch (error) {
      throw new ErrorsCode('ValidationError', error, 400);
    }
  }

  static async registerBody(body) {
    try {
      const schema = Joi.object({
        name: Joi.string().required().min(12).max(100),
        email: Joi.string().required().email().max(100),
        password: Joi.string().required().min(6).max(32),
      });
      
      const result = await schema.validateAsync(body);
      return result;
    } catch (error) {
      throw new ErrorsCode('ValidationError', error, 400);
    }
  }
}

module.exports = Validate;
