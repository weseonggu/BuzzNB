# 환율 정보 GraphQL API

이 프로젝트는 환율 정보를 관리하는 GraphQL API 서버입니다.

## 필수 요구사항

- Node.js v22.16.0
- npm v10.8.0
> 권장: [`nvm-windows`](https://github.com/coreybutler/nvm-windows/releases) 사용을 통해 버전을 맞추세요(윈도우)
## 설치 및 실행 방법

1. 저장소 클론

```bash
git clone [repository-url]
cd [project-directory]
```

2. 의존성 패키지 설치

```bash
npm install
```
3. 노드 버전 설정
```
# 설치되어 있는 노드 버전 리스트
nvm ls
# 22.16.0 버전이 미설치 시 아래 명령어 실행
nvm install 22.16.0 
# 윈도우 기준 관리자 권한으로 cmd실행
nvm use 22.16.0 

```

4. 환경 설정

```bash
# .env.sample 파일수정 후 .env로 파일 변경 [필수]
# .env 파일에서 다음 환경 변수를 설정
DB_CONNECT=mongodb+srv://[username]:[password]@[cluster-url]/[database-name]
# 위와 같은 형식의 문자열을 메일에서 복사하여 DB_CONNECT에 붙여 넣기
```

환경 변수 설명:

- `DB_CONNECT`: MongoDB 연결 문자열 (이메일에 있는 DB 접속 키를 사용)

5. 서버 실행

```bash
node server.js
```

## API 테스트

GraphQL Playground를 통해 API를 테스트할 수 있습니다:

- http://localhost:5110/graphql

## 주요 기능

- 환율 정보 조회
- 환율 정보 업데이트(신규 추가, 변경 동시에 수행 가능)
- 환율 정보 삭제

## 기술 스택

- Node.js
- Express
- GraphQL
- MongoDB Atlas
- Mongoose

## 주의사항

- `.env` 파일은 절대로 Git에 커밋하지 마세요
- MongoDB 연결 문자열은 보안을 위해 안전하게 관리해야 합니다
## 블로그 글
[구현 과제 블로그 글](https://blog.naver.com/fkskdldh/223883457797)<br>
