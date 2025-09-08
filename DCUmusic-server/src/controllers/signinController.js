const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const pool = require('../config/dbPool');

// 로그인 시 refreshToken 주고, 로그아웃 시 회수
// accessToken와 refreshToken을 만드는 규격이 JWT
// accessToken은 요청 인증에 쓰이고, 그것을 발급하기 위해 refreshToken을 생성
const generateToken = (user, secretKey, expirein) => {
    return jwt.sign(user, secretKey, { expiresIn: expirein });
};

exports.login = async (req, res) => {
    // 로그인에는 이메일과 비밀번호만 사용
    const { email, passwd } = req.body; // 리퀘스트를 통해 들어오는 것들
    console.log('email: ', email, 'passwd: ', passwd); // 정보 로그 확인 완료

    try {
        // 1. members 테이블에 email로 회원정보 가져오기
        const selectSQL = `SELECT id, name, email, passwd FROM members WHERE email = ?`;
        const [result] = await pool.query(selectSQL, [email]); // 상기 sql 에 email 담에서 요청 보내기

        // 2_1. 이메일 일치여부 확인: 만약 이메일이 없다면. 정보가 없기 때문에 행의 수는 0, 있다면 1
        if (result.length === 0) {
            return res.status(401).json({
                result: 'fail',
                message: '아이디 또는 비밀번호가 일치하지 않습니다',
            });
        }
        tmpUser = result[0]; // 결과가 있을 경우 tmpUser에 값 저장

        // 2_2. 비밀번호 일치 여부 확인
        // const isMatch = passwd === tmpUser.passwd; // 일치하면 true값 저장
        // 비밀번호 암호화를 했기 때문에 이것을 사용
        const isMatch = await bcrypt.compare(passwd, tmpUser.passwd);
        if (!isMatch) {
            return res.status(401).json({
                result: 'fail',
                message: '아이디 또는 비밀번호가 일치하지 않습니다',
            });
        }

        // 3. 모든 조건 충족 -> // 토큰 생성
        const { passwd: _, ...userPayload } = tmpUser; // 비밀번호를 제외한 모든 객체를 userPayload에 저장
        console.log('userPayload: ', userPayload); // id, name, email 잘 들어오는지 확인

        const accessToken = generateToken(userPayload, process.env.ACCESS_SECRET, '15m');
        const refreshToken = generateToken(userPayload, process.env.REFRESH_SECRET, '1h');
        console.log('accessToken: ', accessToken); // 세션에 저장 예정
        console.log('refreshToken: ', refreshToken); // 디비에 저장 예정

        // 4. 인증 받은 회원의 토큰을 DB에 저장
        const tokenSQL = `UPDATE members SET refreshToken = ? WHERE email = ?`;
        await pool.query(tokenSQL, [refreshToken, email]);

        // 5. 요청을 보낸 곳에 아래의 값들을 전달
        res.json({
            result: 'success',
            message: '로그인 성공!!',
            loginResultData: { accessToken, refreshToken, ...userPayload }, // 토큰(refreshToken은 일단 생략)과 함께 psswd를 제외한 모든 정보를 전달
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: 'fail', message: '회원 인증 실패: ' + error.message });
    }
};

// 로그아웃 요청
exports.logout = async (req, res) => {
    const { email } = req.body; // 로그아웃하려는 사용자의 이메일 받아오기
    console.log('email: ', email);

    if (!email) {
        return res.status(400).json({ result: 'fail', message: '유효하지 않은 요청입니다' });
    }

    try {
        // 1. 로그아웃하면 refreshToken을 null로 SET
        const sql = `UPDATE members SET refreshToken = null WHERE email = ?`;
        const [result] = await pool.query(sql, [email]);

        if (result.affectedRows === 0) {
            return res.status(400).json({ result: 'fail', message: '유효하지 않은 요청입니다' });
        }

        res.json({ result: 'success', message: '로그아웃 완료' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ result: 'fail', message: '로그아웃 실패: ' + error.message });
    }
};

exports.getAuthenticUser = (req, res) => {
    res.json(req.authUser);
};
