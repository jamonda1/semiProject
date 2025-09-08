import { useState, useEffect } from 'react';
import { Offcanvas } from 'react-bootstrap';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import MainContent from './components/MainContent';
import RightSidebar from './components/RightSidebar';
import LoginModal from './components/modals/LoginModal';
import SignUpModal from './components/modals/SignUpModal'; // SignUpModal 컴포넌트 추가
import Player from './components/Player';
import axiosInstance from './api/axiosInstance';
import { useAuthStore } from './stores/authStore';

function App() {
    const [showSidebar, setShowSidebar] = useState(false);
    const handleSidebarClose = () => setShowSidebar(false);
    const handleSidebarShow = () => setShowSidebar(true);
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [playerSong, setPlayerSong] = useState(null);
    const loginAuthUser = useAuthStore((s) => s.loginAuthUser);

    const handleSongSelect = (onSongSelect) => {
        setPlayerSong(onSongSelect);
    };

    useEffect(() => {
        requestAuthUser();
    }, [loginAuthUser]);

    const requestAuthUser = async () => {
        try {
            const accessToken = sessionStorage.getItem('accessToken');
            if (accessToken) {
                const response = await axiosInstance.get('/auth/user', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    },
                });
                const authUser = response.data;
                loginAuthUser(authUser); // 인증사용자 정보 전역 state에 설정 후 로딩상태 false
            }
        } catch (error) {
            console.error('accessToken 유효하지 않음: ', error);
            alert(error);
            sessionStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        }
    };

    return (
        <>
            {/* Header 컴포넌트에 두 모달을 제어할 함수를 모두 전달 */}
            <Header onShowSidebar={handleSidebarShow} setShowLogin={setShowLogin} setShowSignUp={setShowSignUp} />

            <div className="container-fluid">
                <div className="row">
                    <nav id="sidebar" className="col-md-2 d-none d-md-block p-4">
                        <Sidebar />
                    </nav>
                    {/* 화면 작아지면 슬라이드로 나타나도록 */}
                    <Offcanvas show={showSidebar} onHide={handleSidebarClose} placement="start">
                        <Offcanvas.Header closeButton>
                            <Offcanvas.Title>메뉴</Offcanvas.Title>
                        </Offcanvas.Header>
                        <Offcanvas.Body>
                            <Sidebar />
                        </Offcanvas.Body>
                    </Offcanvas>

                    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
                        <div className="row">
                            <div className="col-lg-8">
                                <MainContent onSongSelect={handleSongSelect} />
                            </div>
                            {/* 로그인 모달만 렌더링 */}
                            <LoginModal show={showLogin} setShowLogin={setShowLogin} />
                            {/* 회원가입 모달을 별도로 렌더링 */}
                            <SignUpModal show={showSignUp} setShowSignUp={setShowSignUp} />
                            <div className="col-lg-4">
                                <RightSidebar onSongSelect={handleSongSelect} />
                            </div>
                        </div>
                    </main>
                </div>
            </div>
            <Player currentSong={playerSong} />
        </>
    );
}

export default App;
