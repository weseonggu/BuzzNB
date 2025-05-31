class ExchangeValidator {
    static validateCurrency(currency) {
      const validCurrencies = ['usd', 'krw']; // 유효한 통화 목록
      
      if (!validCurrencies.includes(currency)) {
        throw new Error(`입력하신 통화는 ${currency} 지원 하지 않습니다.`);
      }
      
      return currency;
    }
  
    static validateRate(rate) {
      if (rate <= 0) {
        throw new Error('환율은 0보다 커야합니다.');
      }
      return rate;
    }
  
    static validateDate(date) {
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(date)) {
        throw new Error('YYYY-MM-DD 형식으로 작성해주세요');
      }
  
      const inputDate = new Date(date);
      const today = new Date();
      
      if (isNaN(inputDate.getTime())) {
        throw new Error('유효하지 않은 날짜입니다.');
      }
  
      if (inputDate > today) {
        throw new Error('미래의 날짜는 입력할 수 없습니다.');
      }
  
      return date;
    }
  
    static validateExchangeInfo(info) {
      const validatedInfo = {
        src: this.validateCurrency(info.src),
        tgt: this.validateCurrency(info.tgt),
        rate: this.validateRate(info.rate),
        date: info.date ? this.validateDate(info.date) : new Date().toISOString().split('T')[0]
      };
  
      return validatedInfo;
    }
  
    static validateDeleteInfo(info) {
      return {
        src: this.validateCurrency(info.src),
        tgt: this.validateCurrency(info.tgt),
        date: this.validateDate(info.date)
      };
    }
  }
  
  module.exports = ExchangeValidator;