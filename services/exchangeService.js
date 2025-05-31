const exchangeRepository = require('../repositories/exchangeRepository');

class ExchangeService {
  getExchangeInfo(src, tgt) {
    return exchangeRepository.findBySrcAndTgt(src, tgt);
  }
  updateExchangeRate(info) {
    return exchangeRepository.updateExchangeRate(info);
  }
}

module.exports = new ExchangeService();