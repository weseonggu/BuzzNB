const exchangeRepository = require('../repositories/exchangeRepository');
const ExchangeValidator = require('../validators/exchangeValidator');

class ExchangeService {

    /**
     * 환율 정보 조회
     * @param {*} src 대상 원화 정보
     * @param {*} tgt 목표 원화 정보
     * @returns 환율 정보
     */
    async getExchangeInfo(src, tgt) {
        const { src: validatedSrc, tgt: validatedTgt } = ExchangeValidator.validateSrcAndTgt(src, tgt);
        return await exchangeRepository.findBySrcAndTgt(validatedSrc, validatedTgt);
    }

    /**
     * 환율 정보 업데이트
     * @param {*} info 환율 정보 객체
     * @returns 변경된 환율 정보
     */
    async updateExchangeRate(info) {
        const validatedInfo = ExchangeValidator.validateExchangeInfo(info);
        return await exchangeRepository.updateExchangeRate(validatedInfo);
    }

    /**
     * 환율 정보 삭제
     * @param {*} info 환율 정보 객체
     * @returns 삭제된 환율
     */
    async deleteExchangeRate(info) {
        const validatedInfo = ExchangeValidator.validateDeleteInfo(info);
        return await exchangeRepository.deleteExchangeRate(validatedInfo);
    }
}

module.exports = new ExchangeService();