// /* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import { useSelector } from 'react-redux';
import {
  ListGroup,
} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Message from './Message.jsx';
import useSocketsContext from '../hooks/useSocketsContext.js';
import useChatContext from '../hooks/useChatContext.js';
import LoadingStatus from './LoadingStatus.jsx';

const ChatRoom = () => {
  const { t } = useTranslation();
  const [channelName, setChannelName] = useState('');
  const [currentMessages, setCurrentMessages] = useState([]);
  const [messageText, setMessageText] = useState('');
  const { channels, currentChannelId, messages } = useSelector((store) => store.chatstore);
  const { onSocketError, emitWithPromise } = useSocketsContext();
  const { currentUser } = useChatContext();

  useEffect(() => {
    const currentChannel = channels.find((channel) => channel.id === currentChannelId);
    const messageList = messages.filter((msg) => msg.channelId === currentChannelId);

    if (currentChannel) {
      setChannelName(currentChannel.name);
    }

    setCurrentMessages(messageList);
  }, [currentChannelId, messages]);

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (messageText.trim()) {
      const data = { body: messageText, channelId: currentChannelId, username: currentUser };
      emitWithPromise('newMessage', data);
      setMessageText('');
    }
  };

  return (
    <>
      {onSocketError && <LoadingStatus message={t(onSocketError)} />}
      <div className="settings-tray d-flex justify-content-between align-items-center border-bottom">
        <div className="w-100 d-flex justify-content-start align-items-center p-0">
          <span className="round d-flex justify-content-center align-items-center ms-2">
            #
          </span>
          <div className="py-1">
            <p className="m-0 ms-3">{channelName}</p>
            <p className="m-0 ms-3 text-dark">
              { t('chatroom.messages.counter.count', {
                count: currentMessages.length,
              })}
            </p>
          </div>
        </div>
      </div>
      <ScrollToBottom className="chat-content">
        <ListGroup>
          {currentMessages.map((msg) => {
            const { id, username, body } = msg;
            return <Message key={id} username={username} body={body} />;
          }) }

        </ListGroup>
      </ScrollToBottom>
      <div className="settings-tray d-flex justify-content-between align-items-center mt-auto shadow">
        <form onSubmit={handleSendMessage} className="w-100">
          <div className="input-group mb-3">
            <input type="text" className="form-control" placeholder={t('chatroom.placeholders.write_your_message')} aria-label="Recipient's username" aria-describedby="button-addon2" value={messageText} onChange={(e) => { setMessageText(e.target.value); }} />

            <button className="btn btn-outline-primary main-button shadow" type="button" id="button-addon2" onClick={handleSendMessage}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-square" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
              </svg>
            </button>
          </div>
        </form>

      </div>
    </>
  );
};

export default ChatRoom;
