// 로그인, 회원가입 관련 요청 처리
import axiosInstance from './axiosInstance';

export const apiLogin = async (loginUser) => {
    // 로그인 시도하는 유저의 정보를 받기
    const response = await axiosInstance.post('/auth/login', loginUser);
    return response;
};

export const apiLogout = async ({ email }) => {
    // 로그아웃 시도하는 유저의 email 받기
    const response = await axiosInstance.post('/auth/logout', { email });
    return response;
};

export const apiSignup = async (signupUser) => {
    // 회원가입 하려는 유저의 정보 받기
    const response = await axiosInstance.post('/signup', signupUser);
    return response;
};

export const userLikedSong = async (song, userId) => {
    // 좋아요 눌린 노래의 정보 받기
    const response = await axiosInstance.post('melon-chart/liked', { song, userId });
    return response;
};

export const getLikedSongs = async (userId) => {
    // 로그인한 유저의 아이디 받기
    const response = await axiosInstance.get('melon-chart/getsongs', { params: { userId } });
    return response;
};

export const deleteLikedSong = async (index, userId) => {
    // 삭제할 노래의 index 번호 받기
    const response = await axiosInstance.delete('melon-chart/delsong', { params: { index, userId } });
    return response;
};
