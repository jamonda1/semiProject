const express = require('express');
const app = express();
// const path = require('path');
const cors = require('cors');
const morgan = require('morgan');
const signinRouter = require('./src/routes/signinRouter'); // 로그인 라우터
const signupRouter = require('./src/routes/signupRouter'); // 회원가입 라우터

// .env의 설정 가져오기
require('dotenv').config();
const port = process.env.PORT || 7777;

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // HTML form으로 전송된 데이터를 json으로 파싱해주는 미들웨어
app.use(morgan('dev')); // 상태 코드, 응답시간 등을 표시. 개발 등에 유용
app.use(cors()); // 다른 포트에서 들어오는 요청을 허용

// 현재 프로젝트 디렉토리 __dirname 안에 있는 public 폴더를 정적 파일로 제공해서 public/image.png 등으로 접근 가능 당장은 필요x
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', signinRouter); // 로그인 관련 요청 전달
app.use('/api/signup', signupRouter); // 회원가입 요청 전달

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
