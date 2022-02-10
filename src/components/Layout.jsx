import React from 'react';
import {
  Outlet, Link, useNavigate, useLocation,
} from 'react-router-dom';
import {
  Container, Navbar, Nav,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import useChatContext from '../hooks/useChatContext.js';
import pathes from '../routes.js';

function Layout() {
  const { isAuth, logout } = useChatContext();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { homepagePath } = pathes;
  const handleExit = () => {
    logout();
    navigate(homepagePath());
  };

  return (
    <>
      <Navbar className="shadow">
        <Container fluid>
          <Navbar.Brand as={Link} to={homepagePath()} className="logo">
            Hexlet Chat
          </Navbar.Brand>
          <Nav className="ms-auto">

            {(isAuth() && pathname === homepagePath()) && (
              <Link to={homepagePath()} className="btn btn-outline-primary shadow" onClick={handleExit}>
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
