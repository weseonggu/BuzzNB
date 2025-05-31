const exchangeRepository = require('../repositories/exchangeRepository');
const ExchangeValidator = require('../validators/exchangeValidator');

class ExchangeService {
    async getExchangeInfo(src, tgt) {
        // validateSrcAndTgt 메서드로 검증
        const { src: validatedSrc, tgt: validatedTgt } = ExchangeValidator.validateSrcAndTgt(src, tgt);
        return await exchangeRepository.findBySrcAndTgt(validatedSrc, validatedTgt);
    }

    async updateExchangeRate(info) {
        const validatedInfo = ExchangeValidator.validateExchangeInfo(info);
        return await exchangeRepository.updateExchangeRate(validatedInfo);
    }

    async deleteExchangeRate(info) {
        const validatedInfo = ExchangeValidator.validateDeleteInfo(info);
        return await exchangeRepository.deleteExchangeRate(validatedInfo);
    }
}

module.exports = new ExchangeService();