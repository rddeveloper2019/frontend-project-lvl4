import React from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

function Login() {
  return (
    <div className='login-page page'>
      <Container className='vh-100 text-center d-flex flex-column justify-content-center'>
        <Row>
          <Col className='col text-center  d-flex justify-content-center'>
            <Form className='main-bg p-3 rounded shadow'>
              <p className='my-1 main-color text-uppercase'>Войти</p>
              <Form.Group className='mb-2' controlId='formBasicEmail'>
                <Form.Control
                  type='text'
                  placeholder='Ваш ник'

                  // className='is-invalid'
                />
                <Form.Text className='invalid-feedback'>
                  Неверное имя пользователя
                </Form.Text>
              </Form.Group>

              <Form.Group className='mb-2' controlId='formBasicPassword'>
                <Form.Control
                  type='password'
                  placeholder='Пароль'
                  className='shadow'
                />
                <Form.Text className='invalid-feedback'>
                  Неверный пароль
                </Form.Text>
              </Form.Group>

              <Button
                variant='outline-primary'
                type='submit'
                className='w-100 main-button shadow'
              >
                Войти
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;
