const mongoose = require("mongoose");
require('dotenv').config();  // .env 파일 로드
/**
 * DB 연결
 */
const dbConnect = async () => {
    try {
        // .env 파일에서 DB_CONNECT 변수 가져오기
        const dbUrl = process.env.DB_CONNECT;
        
        if (!dbUrl) {
            throw new Error('DB_CONNECT is not defined in .env file');
        }

        await mongoose.connect(dbUrl);
        console.log("MongoDB Connected");
    } catch (err) {
        console.log("MongoDB Connection Error: ", err);
        process.exit(1);  // 에러 발생 시 프로세스 종료
    }
};

module.exports = dbConnect;