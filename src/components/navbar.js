import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';

const MyNavbar = () => {
    return (
        <>
        <Navbar bg="light" data-bs-theme="light">
            <Container>
            <Nav className="me-auto">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/prediction">Predictor</Link>
                <Link className="nav-link" to="/analytics">Analytics</Link>
            </Nav>
            </Container>
        </Navbar>
        </>
    );
}

export default MyNavbar;