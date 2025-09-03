import { Navbar, Nav, NavDropdown, Container, FormGroup, Form, Row, Col, Button, FormLabel } from 'react-bootstrap';
import { Link, Navigate, useNavigate } from 'react-router-dom';

// 회원가입 담당
export default function Signup() {
    const navigate = useNavigate();

    return (
        <div className="container">
            <h2 className="text-center my -4">회원가입 페이지</h2>
            <Form method="post">
                {/* 이름 입력 */}
                <FormGroup as={Row} className="mb-3">
                    <FormLabel>이름</FormLabel>
                    <Col sm={8}>
                        <Form.Control type="name" name="name" placeholder="Name" />
                    </Col>
                </FormGroup>
                {/* 이메일 입력 */}
                <FormGroup as={Row} className="mb-3">
                    <FormLabel>이메일</FormLabel>
                    <Col sm={8}>
                        <Form.Control type="email" name="email" placeholder="Email" />
                    </Col>
                </FormGroup>
                {/* 비밀번호 입력 */}
                <FormGroup as={Row} className="mb-3">
                    <FormLabel>비밀번호</FormLabel>
                    <Col sm={8}>
                        <Form.Control type="password" name="passwd" placeholder="Password" />
                    </Col>
                </FormGroup>
                {/* 비밀번호 확인 */}
                <FormGroup as={Row} className="mb-3">
                    <FormLabel>비밀번호 확인</FormLabel>
                    <Col sm={8}>
                        <Form.Control type="password" name="passwd" placeholder="Repeat Password" />
                    </Col>
                </FormGroup>

                <Row>
                    <Col>
                        <Button variant="primary" type="button">
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
