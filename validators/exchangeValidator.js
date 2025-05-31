const {ValidationError} = require('../utils/errorHandler');

class ExchangeValidator {
  /**
   * src, tgt 유효성 검증
   * @param {*} currency 
   * @returns 파라미터 반환
   */
    static validateCurrency(currency) {
      const validCurrencies = ['usd', 'krw']; // 유효한 통화 목록
      
      if (!validCurrencies.includes(currency)) {
        throw new ValidationError(`입력하신 통화는 ${currency} 지원 하지 않습니다.`);
      }
      
      return currency;
    }
    /**
     * rate 유효성 검증
     * @param {*} rate 
     * @returns 파라미터 반환
     */
    static validateRate(rate) {
      if (rate <= 0) {
        throw new ValidationError('환율 비율은 0보다 커야 합니다.');
      }
      return rate;
    }
    /**
     * 날짜 유효성 검증
     * @param {} date 
     * @returns 파라미터 반환
     */
    static validateDate(date) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        throw new ValidationError('YYYY-MM-DD 형식으로 작성해주세요');
      }
  
      const inputDate = new Date(date);
      const today = new Date();
      
      if (isNaN(inputDate.getTime())) {
        throw new ValidationError('유효하지 않은 날짜입니다.');
      }
  
      if (inputDate > today) {
        throw new ValidationError('미래의 날짜는 입력할 수 없습니다.');
      }
  
      return date;
    }
    /**
     * 환율 정보 조회 유효성 검증
     * @param {*} src 
     * @param {*} tgt 
     * @returns 파라미터 반환
     */
    static validateSrcAndTgt(src, tgt) {
      if (!src || !tgt) {
        throw new ValidationError('src와 tgt는 필수 입력값입니다');
      }

      return {
        src: this.validateCurrency(src),
        tgt: this.validateCurrency(tgt)
      };
    }
    /**
     * 환율 정보 업데이트 유효성 검증
     * @param {*} info 업데이트 객체
     * @returns 파라미터 반환
     */
    static validateExchangeInfo(info) {
      // 필수 필드 검증
      const requiredFields = ['src', 'tgt', 'rate'];
      
      // 필드가 존재하지 않는 경우 체크
      const missingFields = requiredFields.filter(field => !(field in info));
      if (missingFields.length > 0) {
        throw new ValidationError(`필수 필드가 누락되었습니다: ${missingFields.join(', ')}`);
      }

      // 값이 비어있는 경우 체크
      const emptyFields = requiredFields.filter(field => !info[field]);
      if (emptyFields.length > 0) {
        throw new ValidationError(`필수 필드의 값이 비어있습니다: ${emptyFields.join(', ')}`);
      }

      const validatedInfo = {
        src: this.validateCurrency(info.src),
        tgt: this.validateCurrency(info.tgt),
        rate: this.validateRate(info.rate),
        date: info.date ? this.validateDate(info.date) : new Date().toISOString().split('T')[0]
      };

      if (validatedInfo.src === validatedInfo.tgt && validatedInfo.rate !== 1) {
        throw new ValidationError('같은 통화 간의 환율은 1이어야 합니다');
      }
  
      return validatedInfo;
    }
    /**
     * 환율 정보 삭제 유효성 검증
     * @param {} info 삭제 정보 객체
     * @returns 파라미터 반환
     */
    static validateDeleteInfo(info) {
      // 삭제 시에도 필수 필드 검증
      const requiredFields = ['src', 'tgt', 'date'];
      const missingFields = requiredFields.filter(field => !(field in info));
      
      if (missingFields.length > 0) {
        throw new ValidationError(`필수 필드가 누락되었습니다: ${missingFields.join(', ')}`);
      }

      // 값이 비어있는 경우도 체크
      const emptyFields = requiredFields.filter(field => !info[field]);
      if (emptyFields.length > 0) {
        throw new ValidationError(`필수 필드의 값이 비어있습니다: ${emptyFields.join(', ')}`);
      }

      return {
        src: this.validateCurrency(info.src),
        tgt: this.validateCurrency(info.tgt),
        date: this.validateDate(info.date)
      };
    }
  }
  
  module.exports = ExchangeValidator;