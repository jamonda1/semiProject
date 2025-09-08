// // 인증이 필요한 서비스에 사용 - 좋아요 목록 조회
// // src/api/axiosAuthInstance.js
// import axios from 'axios';
// import { refreshAccessToken } from '../utils/authUtil';

// const axiosAuthInstance = axios.create({
//     baseURL: 'http://localhost:1234/api',
//     headers: { 'Content-Type': 'application/json' },
// });

// // 요청 인터셉터
// axiosAuthInstance.interceptors.request.use(async (config) => {
//     let accessToken = sessionStorage.getItem('accessToken');
//     if (accessToken) {
//         config.headers['Authorization'] = `Bearer ${accessToken}`;
//     }
//     return config;
// });

// // 응답 인터셉터
// axiosAuthInstance.interceptors.response.use(
//     (res) => res,
//     async (err) => {
//         const status = err.response?.status;
//         if (status === 401) {
//             // accessToken 만료 → refreshToken으로 재발급
//             const newAccessToken = await refreshAccessToken();
//             if (newAccessToken) {
//                 sessionStorage.setItem('accessToken', newAccessToken);
//                 err.config.headers['Authorization'] = `Bearer ${newAccessToken}`;
//                 return axiosAuthInstance(err.config);
//             }
//             localStorage.removeItem('refreshToken');
//             sessionStorage.removeItem('accessToken');
//             window.location.href = '/';
//         }
//         return Promise.reject(err);
//     }
// );

// export default axiosAuthInstance;
