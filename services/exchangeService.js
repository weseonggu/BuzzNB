const exchangeRepository = require('../repositories/exchangeRepository');
const ExchangeValidator = require('../validators/exchangeValidator');

class ExchangeService {
  getExchangeInfo(src, tgt) {
    const validatedSrc = ExchangeValidator.validateCurrency(src);
    const validatedTgt = ExchangeValidator.validateCurrency(tgt);
    return exchangeRepository.findBySrcAndTgt(validatedSrc, validatedTgt);
  }

  updateExchangeRate(info) {
    const validatedInfo = ExchangeValidator.validateExchangeInfo(info);
    return exchangeRepository.updateExchangeRate(validatedInfo);
  }

  deleteExchangeRate(info) {
    const validatedInfo = ExchangeValidator.validateDeleteInfo(info);
    return exchangeRepository.deleteExchangeRate(validatedInfo);
  }
}

module.exports = new ExchangeService();