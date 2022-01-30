import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { Formik, Form } from 'formik';
import * as yup from 'yup';
import FormElement from '../components/FormElement.jsx';

function SignUp() {
  const initialValues = {
    nickname: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = yup.object().shape({
    nickname: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
    password: yup
      .string()
      .required('Обязательное поле')
      .min(6, 'Не менее 6 символов'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), ''], 'Пароли должны совпадать')
      .required('Обязательное поле'),
  });

  const onSubmit = (values, onSubmitProps) => {
    console.log('Login Form data: ', values);
    console.log('Login Submit data: ', onSubmitProps);
  };
  return (
    <div className="signup-page page">
      <Container className="vh-100 text-center d-flex flex-column justify-content-center">
        <Row>
          <Col className="col text-center  d-flex justify-content-center">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={onSubmit}
            >
              {(formik) => {
                console.log(formik);
                return (
                  <Form className="p-3 rounded shadow">
                    <p className="my-1 main-color text-uppercase">Войти</p>
                    <FormElement
                      control="nickname"
                      name="nickname"
                      error={formik.errors.nickname}
                      placeholder="Ваш ник"
                      onChange={formik.handleChange}
                      required
                    />
                    <FormElement
                      control="password"
                      name="password"
                      error={formik.errors.password}
                      placeholder="Пароль"
                      onChange={formik.handleChange}
                      required
                    />
                    <FormElement
                      control="password"
                      name="confirmPassword"
                      error={formik.errors.confirmPassword}
                      placeholder="Подтвердите пароль"
                      onChange={formik.handleChange}
                      required
                    />
                    <FormElement control="submit" title="Зарегистрироваться" />
                  </Form>
                );
              }}
            </Formik>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default SignUp;
