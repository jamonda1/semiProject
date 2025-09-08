// import axios from 'axios';

// export const checkTokenExpiration = (token) => {
//     try {
//         // headers.payload.signature
//         const payload = JSON.parse(atob(token.split('.')[1]));
//         const expTime = payload.exp * 1000; // exp: 유효시간 초단위

//         return expTime < Date.now();
//         // 1시   <   2시  => 유효 시간이 지난 경우 => ture
//     } catch (error) {
//         console.error('잘못된 토큰 포맷 에러: ', error);
//         return true;
//     }
// };
// // 리프레시 토큰으로 서버에 요청 보내기
// export const refreshAccessToken = async () => {
//     const refreshToken = localStorage.getItem('refreshToken');
//     if (!refreshToken) {
//         console.log('refreshToken');
//         return null;
//     }
//     // 리프레시 토큰을 보내 서버에서 검증받은 후 새 억세스 토큰을 받자
//     try {
//         const response = await axios.post(`http://localhost:1234/api/auth/refresh`, { refreshToken });
//         const newAccessToken = await response.data?.accessToken;
//         return newAccessToken;
//     } catch (error) {
//         console.error(`refreshToken error: `, error);
//         return null;
//     }
// };
