import React from 'react';
import {
  Outlet, Link,
} from 'react-router-dom';
import {
  Container, Navbar, Nav,
} from 'react-bootstrap';
import useChatContext from '../hooks/useChatContext.js';

function Layout() {
  const { isAuth, logout } = useChatContext();
  return (
    <>
      <Navbar expand="lg" className="shadow">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="logo">
            Hexlet Chat
          </Navbar.Brand>
          <Nav className="ms-auto">

            {isAuth() && (
              <Link to="/" className="btn btn-outline-primary main-link shadow" onClick={logout}>
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
