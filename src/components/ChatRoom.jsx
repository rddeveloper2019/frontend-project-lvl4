/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from 'react-redux';
import {
  Button,
  InputGroup,
  ListGroup,
  FormControl,
} from 'react-bootstrap';
import Message from './Message.jsx';

const ChatRoom = () => {
  const [channelName, setChannelName] = useState('');
  const [currentMessages, setCurrentMessages] = useState([]);
  const { channels, currentChannelId, messages } = useSelector((store) => store.chatstore);

  useEffect(() => {
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);
    const messageList = messages.filter((msg) => msg.channelId === currentChannelId);

    if (currentChannel) {
      setChannelName(currentChannel.name);
    }
    setCurrentMessages(messageList);
  }, [currentChannelId, messages]);

  return (
    <>
      <div className="settings-tray d-flex justify-content-between align-items-center shadow">
        <div className="w-100 channel-item d-flex justify-content-start align-items-center shadow p-0">
          <span className="round d-flex justify-content-center align-items-center ms-2">
            #
          </span>
          <div className="py-1">
            <p className="m-0 ms-3">{channelName}</p>
            <p className="m-0 ms-3 text-dark">
              {currentMessages.length}
              {' '}
              messages
            </p>
          </div>
        </div>
      </div>
      <ScrollToBottom className="chat-content">
        <ListGroup>
          {currentMessages.map(({ id, username, body }) => <Message key={id} username={username} body={body} />)}

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
    </>
  );
};

export default ChatRoom;
