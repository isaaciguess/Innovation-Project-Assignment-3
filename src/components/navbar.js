import React from 'react';
import { NavLink } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { ReactComponent as Logo } from '../assets/img/home-icon.svg';
import  '../styles/navbar.css';

const MyNavbar = () => {
    return (
        <>
            <Navbar bg="light" data-bs-theme="light" className="custom-navbar">
            <Container className="d-flex justify-content-between align-items-center">
                <Nav className="me-auto">
                    <NavLink
                        to="/prediction"
                        className={({ isActive }) => `nav-link px-3 ${isActive ? 'active' : ''}`}
                    >
                        Predictor
                    </NavLink>
                </Nav>

                <Navbar.Brand className="d-flex align-items-center mx-auto brand-text">
                    <Logo width="40" height="40" className="me-2" aria-label="Logo" />
                    Housing Price Predictor
                </Navbar.Brand>

                <Nav className="ms-auto">
                    <NavLink
                        to="/analytics"
                        className={({ isActive }) => `nav-link px-3 ${isActive ? 'active' : ''}`}
                    >
                        Analytics
                    </NavLink>
                </Nav>
            </Container>

            </Navbar>
        </>
    );
}

export default MyNavbar;