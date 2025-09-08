//Login.jsx
import { Modal, Button, Row, Col, Form } from 'react-bootstrap';
import { useState, useRef, useEffect } from 'react';
import { apiLogin } from '../../api/userApi';
import { useAuthStore } from '../../stores/authStore';

// 로그인 담당 모달
export default function LoginModal({ show, setShowLogin }) {
    const [loginUser, setLoginUser] = useState({ email: '', passwd: '' });
    const loginAuthUser = useAuthStore((s) => s.loginAuthUser);

    const emailRef = useRef(null);
    const passwdRef = useRef(null);

    // 모달 열면 바로 email에 포커스
    useEffect(() => {
        if (show) emailRef.current?.focus();
    }, [show]);

    // 입력값 확인
    const handleChange = (e) => {
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
            //alert(JSON.stringify(response)); //{result:'success',message:'로그인 성공',data:{...}}
            // const { result, message, data } = response.data;
            const { loginResultData } = response.data;
            const { accessToken, refreshToken } = loginResultData;

            // alert(authUser.name);

            if (response.status === 200) {
                alert('로그인 성공!');
                sessionStorage.setItem('accessToken', accessToken); // 스토리지에 저장
                localStorage.setItem('refreshToken', refreshToken); // 스토리지에 저장
                loginAuthUser({ ...loginResultData }); // store에 전달
            }
            resetForm();
            setShowLogin(false); //모달 창 닫기
        } catch (error) {
            if (error.response) {
                const { message } = error.response.data;
                alert(message);
            } else {
                alert('Server Error: ' + error.message);
            }
        }
    };

    const resetForm = () => {
        setLoginUser({ email: '', passwd: '' });
        emailRef.current?.focus();
    };

    return (
        <>
            <Modal show={show} onHide={() => setShowLogin(false)}>
                <Modal.Header closeButton>
                    <Modal.Title style={{ color: '#3565af' }}>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col className="p-4 mx-auto" xs={10} sm={10} md={8}>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#3565af' }}>이메일</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="email"
                                        ref={emailRef}
                                        onChange={handleChange}
                                        value={loginUser.email}
                                        placeholder="Email"
                                    />
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label style={{ color: '#3565af' }}>비밀번호</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="passwd"
                                        ref={passwdRef}
                                        onChange={handleChange}
                                        value={loginUser.passwd}
                                        placeholder="Password"
                                    />
                                </Form.Group>
                                <div className="d-grid">
                                    <Button
                                        type="submit"
                                        variant="light"
                                        style={{ border: '2px solid #3565af', color: '#3565af' }}
                                    >
                                        Login
                                    </Button>
                                </div>
                            </Form>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>
        </>
    );
}
