import React from 'react';
import { Link } from 'react-router-dom';
import {
  Container, Col, Row,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

function PageNotFound() {
  const { t } = useTranslation();
  return (
    <div className="page-not-found page">
      <Container className="vh-100 text-center d-flex flex-column justify-content-end">
        <Row>
          <Col className="col text-center  d-flex justify-content-center p-5">
            <Link to="/" className="btn btn-outline-primary shadow text-uppercase">{t('not_found.page_not_found')}</Link>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default PageNotFound;
