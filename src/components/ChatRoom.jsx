/* eslint-disable consistent-return */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from 'react-redux';
import {
  ListGroup,
} from 'react-bootstrap';
import Message from './Message.jsx';
import useSocketsContext from '../hooks/useSocketsContext.js';
import useChatContext from '../hooks/useChatContext.js';
import LoadingStatus from './LoadingStatus.jsx';

const ChatRoom = () => {
  const [channelName, setChannelName] = useState('');
  const [currentMessages, setCurrentMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const { channels, currentChannelId, messages } = useSelector((store) => store.chatstore);
  const { onSocketError, emitWithPromise } = useSocketsContext();
  const { currentUser, initUserName } = useChatContext();

  useEffect(() => {
    initUserName();
  }, []);

  useEffect(() => {
    initUserName();
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);
    const messageList = messages.filter((msg) => msg.channelId === currentChannelId);

    if (currentChannel) {
      setChannelName(currentChannel.name);
    }

    setCurrentMessages(messageList);
  }, [currentChannelId, messages]);

  const handleSetMessage = (e) => {
    e.preventDefault();
    if (!messageText.trim()) {
      return false;
    }

    const data = { body: messageText, channelId: currentChannelId, username: currentUser.username };

    emitWithPromise('newMessage', data);
    setMessageText('');
  };

  return (
    <>
      {onSocketError && <LoadingStatus message={onSocketError.message} />}
      <div className="settings-tray d-flex justify-content-between align-items-center shadow">
        <div className="w-100 d-flex justify-content-start align-items-center p-0">
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
      <div className="settings-tray d-flex justify-content-between align-items-center mt-auto shadow">
        <form onSubmit={handleSetMessage} className="w-100">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder="Write your message" aria-label="Recipient's username" aria-describedby="button-addon2" value={messageText} onChange={(e) => { setMessageText(e.target.value); }} />

            <button className="btn btn-outline-primary main-button shadow" type="button" id="button-addon2" onClick={handleSetMessage}>Send</button>
          </div>
        </form>

      </div>
    </>
  );
};

export default ChatRoom;
