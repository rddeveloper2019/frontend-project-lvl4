import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Container, Image, Navbar, Nav } from 'react-bootstrap';
import logo from '../../assets/img/HSC.png';

function Layout() {
  return (
    <>
      <Navbar bg='light' expand='lg' className='main-bg shadow'>
        <Container fluid>
          <Navbar.Brand href='/'>
            <Image src={logo} className='hexlet-chat-logo'></Image>
          </Navbar.Brand>
          <Nav className='ms-auto'>
            <Link
              to='/login'
              className='btn btn-outline-primary main-link shadow me-3'
            >
              Login
            </Link>
            <Link
              to='/signup'
              className='btn btn-outline-primary main-link shadow me-3'
            >
              SignUp
            </Link>
            <Link
              to='/page-not-found'
              className='btn btn-outline-primary main-link shadow me-3'
            >
              Not found
            </Link>
            <Link to='/' className='btn btn-outline-primary main-link shadow'>
              Выйти
            </Link>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}

export default Layout;
