const mongoose = require('mongoose');

const exchange_rates_schema = new mongoose.Schema({
    src: {
        type: String,
        required: true,
        enum: ['usd', 'krw'],  // 허용된 통화 코드
        trim: true            // 공백 제거
    },
    tgt: {
        type: String,
        required: true,
        enum: ['usd', 'krw'],
        trim: true
    },
    rate: {
        type: Number,
        required: true,
        min: [0, '환율은 0보다 커야 합니다']  // 최소값 설정
    },
    date: {
        type: String,         // GraphQL 타입과 일치시키기 위해 String으로 변경
        required: true,
        match: [/^\d{4}-\d{2}-\d{2}$/, 'YYYY-MM-DD 형식이어야 합니다']  // 날짜 형식 검증
    }
}, {
    timestamps: true,  // createdAt, updatedAt 자동 추가
    versionKey: false  // __v 필드 제거
});

// 복합 인덱스 추가 (조회 성능 향상)
// 1. 기본 복합 인덱스 (중복 방지)
exchange_rates_schema.index({ src: 1, tgt: 1, date: 1 }, { unique: true });

// 2. 최근 날짜 조회를 위한 인덱스
exchange_rates_schema.index({ src: 1, tgt: 1, date: -1 });

const ExchangeRate = mongoose.model('ExchangeRate', exchange_rates_schema);

module.exports = ExchangeRate;