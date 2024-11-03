import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { ReactComponent as Logo } from '../assets/img/home-icon.svg';

const MyNavbar = () => {
    return (
        <>
            <Navbar bg="light" data-bs-theme="light">
                <Container>

                    <Navbar.Brand className="d-flex align-items-center">
                        <Logo width="30" height="30" className="me-2" aria-label="Logo" />
                        Housing Price Predictor
                    </Navbar.Brand>
                    <Nav className="ms-auto">
                        <Link className="nav-link" to="/prediction">Predictor</Link>
                        <Link className="nav-link" to="/analytics">Analytics</Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    );
}

export default MyNavbar;