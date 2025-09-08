const express = require('express');
const router = express.Router();
const signinController = require('../controllers/signinController');
const verifyMiddleware = require('../middlewares/verifyMiddleware');

router.post('/login', signinController.login); // 로그인 요청
router.post('/logout', signinController.logout); // 로그아웃 요청
router.get('/user', verifyMiddleware.verifyAccessToken, signinController.getAuthenticUser); // 세션 기반 로그인 정보 유지

module.exports = router;
