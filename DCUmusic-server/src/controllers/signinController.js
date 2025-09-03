const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/dbPool');

exports.login = async (req, res) => {
    // 로그인에는 이메일과 비밀번호만 사용
    const { email, passwd } = req.body; // 리퀘스트를 통해 들어오는 것들
    console.log('email: ', email, 'passwd: ', passwd); // 정보 로그 확인 완료

    try {
        // 1. members 테이블에 email로 회원정보 가져오기
        const sql = `SELECT id, name, email, passwd FROM members WHERE email = ?`;
        const [result] = await pool.query(sql, [email]); // 상기 sql 에 email 담에서 요청 보내기

        // 2_1. 이메일 일치여부 확인: 만약 이메일이 없다면. 정보가 없기 때문에 행의 수는 0, 있다면 1
        if (result.length === 0) {
            return res.status(401).json({
                result: 'fail',
                message: '아이디 또는 비밀번호가 일치하지 않습니다',
            });
        }
        tmpUser = result[0]; // 결과가 있을 경우 tmpUser에 값 저장

        // 2_2. 비밀번호 일치 여부 확인
        const isMatch = passwd === tmpUser.passwd; // 일치하면 true값 저장
        if (!isMatch) {
            return res.status(401).json({
                result: 'fail',
                message: '아이디 또는 비밀번호가 일치하지 않습니다',
            });
        }

        // 3. 모든 조건 충족 -> bcrypt 등의 복잡한 것은 나중에 추가
        res.json({
            result: 'success',
            message: '로그인 성공!!',
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: 'fail', message: '회원 인증 실패: ' + error.message });
    }
};
