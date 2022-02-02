import React, { useEffect } from 'react';
import {
  Container,
  Col,
  Row,

} from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import { initChat } from '../store/ChatSlice.js';
import Channels from '../components/Channels.jsx';
import ChatRoom from '../components/ChatRoom.jsx';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initChat());
  }, []);

  return (
    <div className="page">
      <Container className="vh-100 text-center d-flex flex-column justify-content-start pt-50px">
        <Row className="h-100">
          <Col className="col-3 h-100 p-1 channels-block settings-tray">
            <Channels />
          </Col>
          <Col className="col-9 border-start border-end h-100 d-flex flex-column justify-content-between p-1">
            <ChatRoom />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
