const exchangeInfo = [
    { src: "usd", tgt: "krw", rate: 1380.30, date: "2025-05-30" },
    { src: "usd", tgt: "krw", rate: 1371.41, date: "2025-05-29" },
    { src: "usd", tgt: "usd", rate: 1, date: "2025-05-30" },
    { src: "usd", tgt: "usd", rate: 1, date: "2025-05-29" },
    { src: "krw", tgt: "krw", rate: 1, date: "2025-05-29" },
    { src: "krw", tgt: "usd", rate: 0.000721, date: "2025-05-29" }
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
          src: src,
          tgt: tgt,
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

    deleteExchangeRate(info) {
      const { src, tgt, date } = info;
      const index = exchangeInfo.findIndex(
        item => item.src === src && 
                item.tgt === tgt && 
                item.date === date
      );

      if (index === -1) {
        throw new Error('Exchange rate not found');
      }

      const deletedItem = exchangeInfo[index];
      exchangeInfo.splice(index, 1);
      return deletedItem;
    }
  }
  
  module.exports = new ExchangeRepository();