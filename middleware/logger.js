const logger = (req, res, next) => {
  const start = Date.now();
  const clientIP = req.ip || req.connection.remoteAddress;
  
  // 요청 정보 로깅
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - IP: ${clientIP}`);
  
  // GraphQL 요청 정보 로깅
  if (req.originalUrl.startsWith('/graphql')) {
    console.log('Request Headers:', req.headers);
    
    if (req.method === 'GET') {
      console.log('GraphQL Query (from URL):', req.query.query);
      if (req.query.variables) {
        console.log('GraphQL Variables (from URL):', req.query.variables);
      }
    } else if (req.method === 'POST') {
      console.log('GraphQL Query (from body):', req.body?.query);
    }

    // 응답 본문을 가로채서 로깅
    const originalSend = res.send;
    res.send = function (body) {
      try {
        const responseBody = JSON.parse(body);
        if (responseBody.errors) {
          console.log('GraphQL Errors:', responseBody.errors);
        }
      } catch (e) {
        // JSON 파싱 실패 시 무시
      }
      return originalSend.call(this, body);
    };
  }
  
  // 응답이 완료되면 실행
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`[${new Date().toISOString()}] Response Status: ${res.statusCode} - ${duration}ms`);
  });
  
  next();
};

module.exports = logger; 