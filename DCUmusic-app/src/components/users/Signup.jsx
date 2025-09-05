import { FormGroup, Form, Row, Col, Button, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';
import axios from 'axios';

// 회원가입 담당
export default function Signup() {
    const navigate = useNavigate();
    const [signupUser, setSignupUser] = useState({ name: '', email: '', passwd: '', repeatPasswd: '' });

    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwdRef = useRef(null);
    const repeatPasswdRef = useRef(null);

    const handleChange = async (e) => {
        // e.target => 지금 입력되고 있는 곳의 name에 입력된 value를 formData에 덮어쓰기
        // email에 입력하면 email을 set, passwd에 입력하면 passwd를 set
        setSignupUser({ ...signupUser, [e.target.name]: e.target.value });
    };

    // 유효성 체크
    const check = () => {
        const { name, email, passwd, repeatPasswd } = signupUser;
        if (!name.trim()) {
            alert('이메일을 입력하세요');
            nameRef.current?.focus();
            return false;
        }
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
        if (!repeatPasswd.trim()) {
            alert('비밀번호를 한 번 더 입력하세요');
            repeatPasswdRef.current?.focus();
            return false;
        }
        if (passwd !== repeatPasswd) {
            alert('비밀번호가 서로 일치하지 않습니다');
            passwdRef.current?.focus();
            return false;
        }

        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const b = check();
        if (!b) return;

        try {
            const url = `http://localhost:1234/api/signup`;
            const response = await axios.post(url, signupUser, {
                headers: {
                    'Content-Type': 'application/json',
                },
            }); // post 요청 전송

            if (response.status === 200) {
                alert('회원가입 성공!');
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
            <h2 className="text-center my -4">회원가입 페이지</h2>
            <Form method="post" onSubmit={handleSubmit}>
                {/* 이름 입력 */}
                <FormGroup as={Row} className="mb-3">
                    <FormLabel>이름</FormLabel>
                    <Col sm={8}>
                        <Form.Control
                            type="name"
                            name="name"
                            ref={nameRef}
                            value={signupUser.name}
                            placeholder="Name"
                            onChange={handleChange}
                        />
                    </Col>
                </FormGroup>
                {/* 이메일 입력 */}
                <FormGroup as={Row} className="mb-3">
                    <FormLabel>이메일</FormLabel>
                    <Col sm={8}>
                        <Form.Control
                            type="email"
                            name="email"
                            ref={emailRef}
                            value={signupUser.email}
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
                            value={signupUser.passwd}
                            placeholder="Password"
                            onChange={handleChange}
                        />
                    </Col>
                </FormGroup>
                {/* 비밀번호 확인 */}
                <FormGroup as={Row} className="mb-3">
                    <FormLabel>비밀번호 확인</FormLabel>
                    <Col sm={8}>
                        <Form.Control
                            type="password"
                            name="repeatPasswd"
                            ref={repeatPasswdRef}
                            value={signupUser.repeatPasswd}
                            placeholder="Repeat Password"
                            onChange={handleChange}
                        />
                    </Col>
                </FormGroup>

                <Row>
                    <Col>
                        <Button variant="primary" type="submit">
                            회원가입
                        </Button>
                        <Button variant="secondary" type="button" onClick={() => navigate('/')}>
                            홈으로
                        </Button>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}
