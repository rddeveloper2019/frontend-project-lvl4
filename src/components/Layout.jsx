import React from 'react';
import {
  Outlet, Link,
} from 'react-router-dom';
import {
  Container, Navbar, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useChatContext from '../hooks/useChatContext.js';

function Layout() {
  const { isAuth, logout } = useChatContext();
  const { t } = useTranslation();
  return (
    <>
      <Navbar className="shadow">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="logo">
            Hexlet Chat
          </Navbar.Brand>
          <Nav className="ms-auto">

            {isAuth() && (
              <Link to="/" className="btn btn-outline-primary main-link shadow" onClick={logout}>
                {t('layout.buttons.exit')}
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
