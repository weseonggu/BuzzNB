const exchangeInfo = [
    { src: "USD", tgt: "KRW", rate: 1380.30, date: "2025-05-30" },
    { src: "USD", tgt: "KRW", rate: 1371.41, date: "2025-05-29" },
    { src: "KRW", tgt: "USD", rate: 0.00072, date: "2025-05-30" },
    { src: "KRW", tgt: "USD", rate: 0.00072, date: "2025-05-29" },
  ];
  
  class ExchangeRepository {
    findBySrcAndTgt(src, tgt) {
      return exchangeInfo.filter(
        (item) => item.src === src && item.tgt === tgt
      );
    }
    updateExchangeRate(info) {
        const { src, tgt, rate, date } = info;
        const today = new Date().toISOString().split('T')[0];
        
        const newInfo = {
          src: src.toUpperCase(),
          tgt: tgt.toUpperCase(),
          rate,
          date: date || today
        };
    
        // 기존 데이터가 있으면 업데이트, 없으면 추가
        const index = exchangeInfo.findIndex(
          item => item.src === newInfo.src && 
                  item.tgt === newInfo.tgt && 
                  item.date === newInfo.date
        );
    
        if (index !== -1) {
          exchangeInfo[index] = newInfo;
        } else {
          exchangeInfo.push(newInfo);
        }
    
        return newInfo;
    }
  }
  
  module.exports = new ExchangeRepository();