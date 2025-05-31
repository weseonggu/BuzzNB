const ExchangeRate = require('../schema/exchangeRate');

  
class ExchangeRepository {
    async findBySrcAndTgt(src, tgt) {
        return await ExchangeRate.find({ src, tgt });
    }

    async updateExchangeRate(info) {
        const { src, tgt, rate, date } = info;
        const today = new Date().toISOString().split('T')[0];
        
        try {
        // findOneAndUpdate를 사용하여 upsert 수행
        const result = await ExchangeRate.findOneAndUpdate(
            // 검색 조건
            { 
            src: src, 
            tgt: tgt, 
            date: date || today 
            },
            // 업데이트할 데이터
            { 
            rate: rate 
            },
            // 옵션
            { 
            new: true,           // 업데이트된 문서 반환
            upsert: true,        // 문서가 없으면 생성
            runValidators: true  // 스키마 유효성 검사 실행
            }
        );

        return result;
        } catch (error) {
        if (error.code === 11000) {
            throw new Error('중복된 환율 정보 입니다.');
        }
        throw error;
        }
    }

    async deleteExchangeRate(info) {
        const { src, tgt, date } = info;
        
        const result = await ExchangeRate.findOneAndDelete({
        src: src,
        tgt: tgt,
        date
        });

        if (!result) {
        throw new Error('환율을 못찾았습니다.');
        }

        return result;
    }
}
  
  module.exports = new ExchangeRepository();