import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, NavDropdown, Container, FormGroup } from 'react-bootstrap';

// 홈 - 회원 정보 수정은 어디서??
export default function Home() {
    return (
        <div>
            <h1>Home</h1>
            <Nav.Link as={Link} to="/signin">
                로그인하기
            </Nav.Link>
        </div>
    );
}
