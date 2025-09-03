import { Navbar, Nav, NavDropdown, Container, FormGroup, Form, Row, Col, Button, FormLabel } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';

// 로그인 담당
export default function Signin() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h2 className="text-center my -4">로그인 페이지</h2>
            <Form method="post">
                {/* 아이디 입력 */}
                <FormGroup as={Row} className="mb-3">
                    <FormLabel>이메일</FormLabel>
                    <Col sm={8}>
                        <Form.Control type="email" name="email" placeholder="email" />
                    </Col>
                </FormGroup>
                {/* 비밀번호 입력 */}
                <FormGroup as={Row} className="mb-3">
                    <FormLabel>비밀번호</FormLabel>
                    <Col sm={8}>
                        <Form.Control type="password" name="passwd" placeholder="Password" />
                    </Col>
                </FormGroup>

                <Row>
                    <Col>
                        <Button variant="primary" type="button">
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
