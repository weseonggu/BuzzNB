// GraphQL 에러 타입 정의
const ErrorTypes = {
  VALIDATION: 'VALIDATION',
  NOT_FOUND: 'NOT_FOUND',
  INTERNAL: 'INTERNAL'
};

// 에러 메시지 패턴
const ErrorPatterns = {
  [ErrorTypes.VALIDATION]: ['required type', 'Field'],
  [ErrorTypes.NOT_FOUND]: ['not found', 'does not exist']
};

// 에러 타입에 따른 상태 코드 매핑
const ErrorStatusCodes = {
  [ErrorTypes.VALIDATION]: 400,
  [ErrorTypes.NOT_FOUND]: 404,
  [ErrorTypes.INTERNAL]: 500
};

// 에러 타입에 따른 에러 코드 매핑
const ErrorCodes = {
  [ErrorTypes.VALIDATION]: 'BAD_REQUEST',
  [ErrorTypes.NOT_FOUND]: 'NOT_FOUND',
  [ErrorTypes.INTERNAL]: 'INTERNAL_SERVER_ERROR'
};

// 에러 타입 판별 함수
const getErrorType = (error) => {
  const message = error.message.toLowerCase();
  
  for (const [type, patterns] of Object.entries(ErrorPatterns)) {
    if (patterns.some(pattern => message.includes(pattern.toLowerCase()))) {
      return type;
    }
  }
  
  return ErrorTypes.INTERNAL;
};

// GraphQL 에러 포맷팅 함수
const formatGraphQLError = (error) => {
  const errorType = getErrorType(error);
  const originalError = error.originalError;

  // 커스텀 에러가 있는 경우 해당 에러 정보 사용
  if (originalError?.status) {
    return {
      message: originalError.message || error.message,
      path: error.path,
      extensions: {
        code: originalError.code || ErrorCodes[ErrorTypes.INTERNAL],
        status: originalError.status,
        timestamp: new Date().toISOString()
      }
    };
  }

  // 기본 GraphQL 에러 처리
  return {
    message: error.message,
    path: error.path,
    extensions: {
      code: ErrorCodes[errorType],
      status: ErrorStatusCodes[errorType],
      timestamp: new Date().toISOString()
    }
  };
};

module.exports = {
  formatGraphQLError,
  ErrorTypes,
  ErrorCodes,
  ErrorStatusCodes
}; 