// 인증이 필요없는 서비스 - 회원가입, 로그인 등등 근데 아마 여기서는 다 이거인듯
import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `http://localhost:1234/api/auth`,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;
