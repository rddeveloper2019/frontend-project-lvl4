import React, { useEffect } from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import {
  Container,
  Col,
  Row,
  Button,
  InputGroup,
  ListGroup,
  FormControl,

} from 'react-bootstrap';

import { useDispatch } from 'react-redux';
import Channels from '../components/Channels.jsx';

import { sayHello, initChat } from '../store/ChatSlice.js';

const Main = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(initChat());
    dispatch(sayHello());
  }, []);
  return (
    <div className="page">
      <Container className="vh-100 text-center d-flex flex-column justify-content-start pt-50px">
        <Row className="h-100">
          <Col className="col-3 h-100 p-1 channels-block settings-tray">
            <Channels />
          </Col>
          <Col className="col-9 border-start border-end h-100 d-flex flex-column justify-content-between p-1">
            <div className="settings-tray d-flex justify-content-between align-items-center shadow">
              <div className="w-100 channel-item d-flex justify-content-start align-items-center shadow p-0">
                <span className="round d-flex justify-content-center align-items-center ms-2">
                  #
                </span>
                <div className="py-1">
                  <p className="text-center m-0 ms-3">Channel-name</p>
                  <p className="text-center m-0 ms-3 text-dark">8 messages</p>
                </div>
              </div>
            </div>
            <ScrollToBottom className="chat-content">
              <ListGroup>
                <ListGroup.Item
                  as="li"
                  className="d-flex bg-transparent py-1 border-0"
                >
                  <div className="p-1 mb-1 bg-gray text-dark d-inline-block rounded text-start">
                    <em>User: </em>
                    Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex bg-transparent py-1 border-0"
                >
                  <div className="p-1 mb-1 bg-gray text-dark d-inline-block rounded text-start">
                    <em>User: </em>
                    Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                {' '}
                <ListGroup.Item
                  as="li"
                  className="d-flex bg-transparent py-1 border-0"
                >
                  <div className="p-1 mb-1 bg-gray text-dark d-inline-block rounded text-start">
                    <em>User: </em>
                    Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                {' '}
                <ListGroup.Item
                  as="li"
                  className="d-flex bg-transparent py-1 border-0"
                >
                  <div className="p-1 mb-1 bg-gray text-dark d-inline-block rounded text-start">
                    <em>User: </em>
                    Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex bg-transparent py-1 border-0"
                >
                  <div className="p-1 mb-1 bg-gray text-dark d-inline-block rounded text-start">
                    <em>User: </em>
                    Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex bg-transparent py-1 border-0"
                >
                  <div className="p-1 mb-1 bg-gray text-dark d-inline-block rounded text-start">
                    <em>User: </em>
                    Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex bg-transparent py-1 border-0"
                >
                  <div className="p-1 mb-1 bg-gray text-dark d-inline-block rounded text-start">
                    <em>User: </em>
                    Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex bg-transparent py-1 border-0"
                >
                  <div className="p-1 mb-1 bg-gray text-dark d-inline-block rounded text-start">
                    <em>User: </em>
                    Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as="li"
                  className="d-flex bg-transparent py-1 border-0"
                >
                  <div className="p-1 mb-1 bg-gray text-dark d-inline-block rounded text-start">
                    <em>User: </em>
                    Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
              </ListGroup>
            </ScrollToBottom>
            <div className="settings-tray bg-gray d-flex justify-content-between align-items-center mt-auto shadow">
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Write your message"
                  aria-label="Username"
                  aria-describedby="button-addon2"
                />
                <Button
                  variant="outline-primary"
                  type="button"
                  id="button-addon2"
                  className="main-button shadow"
                >
                  send
                </Button>
              </InputGroup>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Main;
