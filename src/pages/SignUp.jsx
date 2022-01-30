import React from 'react';
import { Container, Col, Row, Form, Button } from 'react-bootstrap';

function SignUp() {
  return (
    <div className='signup-page page'>
      <Container className='vh-100 text-center d-flex flex-column justify-content-center'>
        <Row>
          <Col className='col text-center  d-flex justify-content-center'>
            <Form className='main-bg p-3 rounded shadow'>
              <p className='my-1 main-color text-uppercase'>Регистрация</p>
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
                  className='is-invalid shadow'
                />
                <Form.Text className='invalid-feedback'>
                  Неверный пароль
                </Form.Text>
              </Form.Group>

              <Form.Group className='mb-2' controlId='formBasicPassword'>
                <Form.Control
                  type='password'
                  placeholder='Подтвердите пароль'
                  className='is-invalid shadow'
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
                Зарегистрироваться
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;
