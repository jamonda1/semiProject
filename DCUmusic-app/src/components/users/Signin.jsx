import { FormGroup, Form, Row, Col, Button, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import { useAuthStore } from '../../stores/userAuthStore';
import { apiLogin } from '../../api/userApi';

// 로그인 담당
export default function Signin() {
    const navigate = useNavigate();
    const [loginUser, setLoginUser] = useState({ email: '', passwd: '' });
    const loginAuthUser = useAuthStore((s) => s.loginAuthUser); // store에 login 값들을 저장하기 위해
    // const authUser = useAuthStore((s) => s.authUser); // 결과값 확인 후 지우자

    const emailRef = useRef(null);
    const passwdRef = useRef(null);

    // 입력값 확인
    const handleChange = async (e) => {
        // e.target => 지금 입력되고 있는 곳의 name에 입력된 value를 formData에 덮어쓰기
        // email에 입력하면 email을 set, passwd에 입력하면 passwd를 set
        setLoginUser({ ...loginUser, [e.target.name]: e.target.value });
    };

    // 유효성 체크
    const check = () => {
        const { email, passwd } = loginUser;
        if (!email.trim()) {
            alert('이메일을 입력하세요');
            emailRef.current?.focus();
            return false;
        }
        if (!passwd.trim()) {
            alert('비밀번호를 입력하세요');
            passwdRef.current?.focus();
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const b = check(); // 유효성 체크 함수 실행
        if (!b) return;

        try {
            const response = await apiLogin(loginUser);
            // alert(JSON.stringify(response.data)); // 어떤 값들이 오는지 확인 완료.

            const { loginResultData } = response.data;
            const { accessToken } = loginResultData;

            loginAuthUser({ ...loginResultData }); // store에 전달
            // alert(authUser.name);

            if (response.status === 200) {
                alert('로그인 성공');
                sessionStorage.setItem('accessToken', accessToken); // 세션에 토큰 저장
                navigate('/');
            }
        } catch (error) {
            if (error.response) {
                const { message } = error.response.data;
                alert(message);
            } else {
                alert('Server Error: ' + error.message);
            }
        }
    };

    return (
        <div className="container">
            <h2 className="text-center my -4">로그인 페이지</h2>
            <Form method="post" onSubmit={handleSubmit}>
                {/* 아이디 입력 */}
                <FormGroup as={Row} className="mb-3">
                    <FormLabel>이메일</FormLabel>
                    <Col sm={8}>
                        <Form.Control
                            type="email"
                            name="email"
                            ref={emailRef}
                            value={loginUser.email}
                            placeholder="Email"
                            onChange={handleChange}
                        />
                    </Col>
                </FormGroup>
                {/* 비밀번호 입력 */}
                <FormGroup as={Row} className="mb-3">
                    <FormLabel>비밀번호</FormLabel>
                    <Col sm={8}>
                        <Form.Control
                            type="password"
                            name="passwd"
                            ref={passwdRef}
                            value={loginUser.passwd}
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </Col>
                </FormGroup>
                {/* 버튼 */}
                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            로그인
                        </Button>
                        <Button variant="secondary" type="button" onClick={() => navigate('/signup')}>
                            회원가입
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
