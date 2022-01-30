import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';
import { Navigate } from 'react-router-dom';

import {
  Container,
  Col,
  Row,
  Button,
  InputGroup,
  ListGroup,
  ButtonGroup,
  FormControl,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';

const Main = () => {
  const isAuth = true;
  if (!isAuth) {
    return <Navigate to='/login' />;
  }

  return (
    <div className='page'>
      <Container className='vh-100 text-center d-flex flex-column justify-content-start pt-50px'>
        <Row className='h-100'>
          <Col className='col-3 h-100 p-1 channels-block'>
            <div className='settings-tray bg-gray d-flex justify-content-between align-items-center shadow'>
              <Button
                variant='outline-primary'
                className='btn w-100  d-flex justify-content-start align-items-center main-button shadow'
                data-bs-toggle='modal'
                data-bs-target='#exampleModal'
              >
                <span className='round d-flex justify-content-center align-items-center'>
                  +
                </span>
                <p className='text-center m-0 ms-3'>Add Channel</p>
              </Button>
            </div>
            <div className='channels-list'>
              <ListGroup>
                <ListGroup.Item className='list-group-item bg-transparent border-0'>
                  <Button
                    variant='outline-primary'
                    className='btn w-100 channel-item d-flex justify-content-start align-items-center main-button shadow  '
                  >
                    <span className='round d-flex justify-content-center align-items-center'>
                      #
                    </span>
                    <p className='text-center m-0 ms-3'>Channel-main-1</p>
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item className='list-group-item bg-transparent border-0'>
                  <Button
                    variant='outline-primary'
                    className='btn w-100 channel-item d-flex justify-content-start align-items-center main-button shadow'
                  >
                    <span className='round d-flex justify-content-center align-items-center'>
                      #
                    </span>
                    <p className='text-center m-0 ms-3'>Channel-main-1</p>
                  </Button>
                </ListGroup.Item>
                <ListGroup.Item className='list-group-item bg-transparent border-0'>
                  <ButtonGroup className='btn w-100 d-flex justify-content-start align-items-center p-0 main-button shadow  '>
                    <Button
                      variant='outline-primary'
                      className='btn d-flex justify-content-start align-items-center custom-channel-button '
                    >
                      <span className='round d-flex justify-content-center align-items-center'>
                        #
                      </span>
                      <p className='text-center m-0 ms-3'>Channel-main-1</p>
                    </Button>
                    <DropdownButton
                      as={ButtonGroup}
                      id='bg-vertical-dropdown-3'
                      variant='outline-primary'
                      className='custom-channel-button'
                      title=''
                    >
                      <Dropdown.Item>Dropdown link</Dropdown.Item>

                      <Dropdown.Item>Dropdown link</Dropdown.Item>
                    </DropdownButton>
                  </ButtonGroup>
                </ListGroup.Item>
              </ListGroup>
            </div>
          </Col>
          <Col className='col-9 border-start border-end h-100 d-flex flex-column justify-content-between p-1'>
            <div className='settings-tray bg-gray d-flex justify-content-between align-items-center shadow'>
              <div className='w-100 channel-item d-flex justify-content-start align-items-center shadow p-0'>
                <span className='round d-flex justify-content-center align-items-center ms-2'>
                  #
                </span>
                <div className='py-1'>
                  <p className='text-center m-0 ms-3'>Channel-name</p>
                  <p className='text-center m-0 ms-3 text-muted'>8 messages</p>
                </div>
              </div>
            </div>
            <ScrollToBottom className='chat-content'>
              <ListGroup>
                <ListGroup.Item
                  as='li'
                  className='d-flex bg-transparent py-1 border-0'
                >
                  <div className='p-2 mb-1 bg-gray text-dark d-inline-block rounded text-start'>
                    <em>User: </em>Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as='li'
                  className='d-flex bg-transparent py-1 border-0'
                >
                  <div className='p-2 mb-1 bg-gray text-dark d-inline-block rounded text-start'>
                    <em>User: </em>Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>{' '}
                <ListGroup.Item
                  as='li'
                  className='d-flex bg-transparent py-1 border-0'
                >
                  <div className='p-2 mb-1 bg-gray text-dark d-inline-block rounded text-start'>
                    <em>User: </em>Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>{' '}
                <ListGroup.Item
                  as='li'
                  className='d-flex bg-transparent py-1 border-0'
                >
                  <div className='p-2 mb-1 bg-gray text-dark d-inline-block rounded text-start'>
                    <em>User: </em>Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as='li'
                  className='d-flex bg-transparent py-1 border-0'
                >
                  <div className='p-2 mb-1 bg-gray text-dark d-inline-block rounded text-start'>
                    <em>User: </em>Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as='li'
                  className='d-flex bg-transparent py-1 border-0'
                >
                  <div className='p-2 mb-1 bg-gray text-dark d-inline-block rounded text-start'>
                    <em>User: </em>Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                {/* <ListGroup.Item
                  as='li'
                  className='d-flex bg-transparent py-1 border-0'
                >
                  <div className='p-2 mb-1 bg-gray text-dark d-inline-block rounded text-start'>
                    <em>User: </em>Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as='li'
                  className='d-flex bg-transparent py-1 border-0'
                >
                  <div className='p-2 mb-1 bg-gray text-dark d-inline-block rounded text-start'>
                    <em>User: </em>Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item>
                <ListGroup.Item
                  as='li'
                  className='d-flex bg-transparent py-1 border-0'
                >
                  <div className='p-2 mb-1 bg-gray text-dark d-inline-block rounded text-start'>
                    <em>User: </em>Lorem ipsum dolor sit amet.lorem7 ipsum dolor
                    sit amet.lorem7 ipsum dolor sit amet.lorem7
                  </div>
                </ListGroup.Item> */}
              </ListGroup>
            </ScrollToBottom>
            <div className='settings-tray bg-gray d-flex justify-content-between align-items-center mt-auto shadow'>
              <InputGroup className='mb-3'>
                <FormControl
                  placeholder='Write your message'
                  aria-label='Username'
                  aria-describedby='button-addon2'
                />
                <Button
                  variant='outline-primary'
                  type='button'
                  id='button-addon2'
                  className='main-button shadow'
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
