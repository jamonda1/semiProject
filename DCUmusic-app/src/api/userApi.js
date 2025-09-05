// 로그인 관련 요청 처리
import axiosInstance from './axiosInstance';

export const apiLogin = async (loginUser) => {
    // 로그인 시도하는 유저의 정보를 받기
    const response = await axiosInstance.post(`/login`, loginUser);
    return response;
};
