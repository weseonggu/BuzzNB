const ExchangeRate = require('../schema/exchangeRate');

  
class ExchangeRepository {

    /**
     * 정보 DB조회
     * @param {*} src 대상 원화 정보
     * @param {*} tgt 목표 원화 정보
     * @returns 최근 날짜의 환율 데이터
     */
    async findBySrcAndTgt(src, tgt) {
        return await ExchangeRate.findOne({ src, tgt })
            .sort({ date: -1 })  // 날짜 내림차순 정렬
            .limit(1);          // 첫 번째 결과만 반환
    }

    /**
     * 데이터 업데이트: 없으면 추가 있으면 변경
     * @param {*} info 환율 정보 객체
     * @returns 변경된 데이터
     */
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

    /**
     * 데이터 삭제
     * @param {*} info 환율 정보 객체
     * @returns 삭제된 환율 정보
     */
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