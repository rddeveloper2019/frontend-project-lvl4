import React from 'react';
import {
  Outlet, Link, useLocation,
} from 'react-router-dom';
import {
  Container, Image, Navbar, Nav,
} from 'react-bootstrap';
import logo from '../../assets/img/HSC.png';

function Layout() {
  const location = useLocation();

  return (
    <>
      <Navbar expand="lg" className="shadow">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <Image src={logo} className="hexlet-chat-logo" />
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Link
              to="/login"
              className="btn btn-outline-primary main-link shadow me-3"
            >
              Login
            </Link>
            <Link
              to="/signup"
              className="btn btn-outline-primary main-link shadow me-3"
            >
              SignUp
            </Link>

            {location.pathname !== '/login' && (
              <Link to="/" className="btn btn-outline-primary main-link shadow">
                Выйти
              </Link>
            )}
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Layout;
