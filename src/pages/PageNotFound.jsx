import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';

function PageNotFound() {
  return (
    <div className="page-not-found page">
      <Container className="vh-100 text-center d-flex flex-column justify-content-end">
        <Row>
          <Col className="col text-center  d-flex justify-content-center">
            <p className="main-color p-2 shadow mb-5 text-uppercase">
              Страница не найдена
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PageNotFound;
