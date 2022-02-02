/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import {
  Button,
  ListGroup, Spinner, ButtonGroup, Row,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentChannel } from '../store/ChatSlice.js';
import Channel from './Channel.jsx';

const LoadingStatus = ({ message }) => (
  <ListGroup.Item className="list-group-item bg-primary border-0">
    <div className="p-2 shadow mb-2 text-uppercase text-light not-found-label">
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
        className=" bg-warning"

      />
      {message}
    </div>

  </ListGroup.Item>
);

const Channels = () => {
  const {
    channels, channelsFetchState,
    channelsFetchError, currentChannelId,
  } = useSelector((store) => store.chatstore);

  const dispatch = useDispatch();

  const handleOnClick = (id) => () => {
    dispatch(setCurrentChannel({ id }));
  };
  const handleRename = (id) => () => {
    console.log('rename ', id);
  };
  const handleDelete = (id) => () => {
    console.log('delete ', id);
  };

  return (
    <>

      <div className="channels-list">
        <ListGroup>
          {channelsFetchState === 'loading' && <LoadingStatus message="Loading..." />}
          {channelsFetchState === 'rejected' && <LoadingStatus message={channelsFetchError} />}
          <ListGroup.Item className="list-group-item bg-transparent border-0 ">
            <ButtonGroup className="w-100">
              <Button
                variant="outline-primary"
                className="channel-button py-3"
              >
                <span className="round me-2">+</span>
                {' '}
                <span>Add channel</span>
              </Button>
            </ButtonGroup>
          </ListGroup.Item>

        </ListGroup>
        {' '}
        <Row className="h-100">
          <ScrollToBottom className="h-100">

            <ListGroup>

              {channels.map((channel) => {
                const active = channel.id === currentChannelId;
                return <Channel key={channel.id} {...channel} active={active} handleOnClick={handleOnClick} />;
              })}

            </ListGroup>

          </ScrollToBottom>
        </Row>

      </div>

    </>

  );
};
export default Channels;
