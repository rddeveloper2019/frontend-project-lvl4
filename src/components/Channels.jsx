/* eslint-disable max-len */
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import {
  Button,
  ListGroup, ButtonGroup, Row,
} from 'react-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { setCurrentChannel, setSelectedChannel } from '../store/ChatSlice.js';
import { showModal } from '../store/ModalSlice.js';
import Channel from './Channel.jsx';
import LoadingStatus from './LoadingStatus.jsx';

const Channels = () => {
  const { t } = useTranslation();
  const {
    channels, channelsFetchState,
    channelsFetchError, currentChannelId,
  } = useSelector((store) => store.chatstore);

  const dispatch = useDispatch();

  const handleOnClick = (id) => () => {
    dispatch(setCurrentChannel({ id }));
  };

  const handleShowModal = (id, modalType) => () => {
    dispatch(setSelectedChannel(id));
    dispatch(showModal(modalType));
  };

  return (
    <>

      <div className="channels-list">
        <ListGroup>
          {channelsFetchState === 'loading' && <LoadingStatus message={t(`fetchErrors.${channelsFetchState}`)} />}
          {channelsFetchState === 'rejected' && <LoadingStatus message={t(`fetchErrors.${channelsFetchError}`)} />}
          <ListGroup.Item className="list-group-item bg-transparent border-0 ">
            <ButtonGroup className="w-100">
              <Button
                variant="outline-primary"
                className="channel-button py-3"
                onClick={() => dispatch(showModal('addChannel'))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-square me-1" viewBox="0 0 16 16">
                  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                  <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                </svg>
                <span className="visually-hidden">
                  {t('channels.add_button')}
                </span>
                <span>{t('channels.channels')}</span>
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
                return <Channel key={channel.id} {...channel} active={active} handleOnClick={handleOnClick} handleShowModal={handleShowModal} />;
              })}

            </ListGroup>

          </ScrollToBottom>
        </Row>

      </div>

    </>

  );
};
export default Channels;
