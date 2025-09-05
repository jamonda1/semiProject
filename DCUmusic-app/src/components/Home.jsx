import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, FormGroup, Button } from 'react-bootstrap';
import { useAuthStore } from '../stores/userAuthStore';
import axios from 'axios';

// 홈 - 회원 정보 수정은 어디서??
export default function Home() {
    const authUser = useAuthStore((s) => s.authUser); // loginAuthUser를 통해 저장된 값을 가져오기 위해
    const logout = useAuthStore((s) => s.logout);

    const handleLogout = async () => {
        if (!authUser) return; // 이미 정보가 없으면 리턴
        try {
            const url = `http://localhost:1234/api/auth/logout`;
            const response = await axios.post(
                url,
                { email: authUser.email },
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            ); // 로그아웃 요청 보내기
            if (response.status === 200) {
                logout(); // 스토어에 값 비우기
                alert('로그아웃 성공');
                sessionStorage.removeItem('accessToken'); // 세션에 저장된 토큰 삭제
            }
        } catch (error) {
            if (error.response) {
                const { message } = error.response.data;
                alert(message);
            } else {
                if (error.response) {
                    const { message } = error.response.data;
                    alert(message);
                } else {
                    alert('Server Error: ' + error.message);
                }
            }
        }
    };

    return (
        <div>
            <h1>Home</h1>
            <hr />
            {!authUser && (
                <>
                    <h3>로그인을 해주세요!</h3>
                    <Nav.Link as={Link} to="/signin">
                        로그인하기
                    </Nav.Link>
                </>
            )}
            {authUser && (
                <>
                    <h3>{authUser.name} 님 로그인!</h3>
                    <Button variant="secondary" type="button" onClick={handleLogout}>
                        로그아웃하기
                    </Button>
                </>
            )}
        </div>
    );
}
