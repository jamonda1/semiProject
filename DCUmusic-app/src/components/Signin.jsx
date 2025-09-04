import { FormGroup, Form, Row, Col, Button, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from 'axios';

// 로그인 담당
export default function Signin() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', passwd: '' });

    const emailRef = useRef(null);
    const passwdRef = useRef(null);

    // 입력값 확인
    const handleChange = async (e) => {
        // e.target => 지금 입력되고 있는 곳의 name에 입력된 value를 formData에 덮어쓰기
        // email에 입력하면 email을 set, passwd에 입력하면 passwd를 set
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 유효성 체크
    const check = () => {
        const { email, passwd } = formData;
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
            const url = `http://localhost:7777/api/auth/login`; // 백엔드의 /login으로 요청 전송
            const response = await axios.post(url, formData, {
                // url에 formData와 헤더값 추가해서 전송
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const { result, message } = response;

            if (response.status === 200) {
                alert('로그인 성공');
                navigate('/');
            } else {
                alert(message);
            }
        } catch (error) {
            alert('Server Error: ' + error.message);
        }
    };

    const { email, passwd } = formData;

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
                            value={email}
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
                            value={passwd}
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
