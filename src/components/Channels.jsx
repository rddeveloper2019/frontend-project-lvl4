/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import {
  Button,
  ListGroup, Row,
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
          {' '}

          <ListGroup.Item className="list-group-item bg-transparent border-0 ">
            {' '}

            <div className="d-flex justify-content-between mb-2 ps-4 pe-2 align-items-center  main-color">
              <span>{t('channels.channels')}</span>
              <Button
                variant="outline-primary"
                className="py-2 "
                onClick={() => dispatch(showModal('addChannel'))}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
                  <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
                </svg>
                <span className="visually-hidden">
                  {t('channels.add_button')}
                </span>

              </Button>
            </div>
          </ListGroup.Item>

        </ListGroup>
        {' '}
        <Row className="h-100">
          <ScrollToBottom className="h-100">

            <ListGroup>

              {channels.map((channel) => {
                const active = channel.id === currentChannelId;
                return (
                  <Channel
                    key={channel.id}
                    {...channel}
                    active={active}
                    handleOnClick={handleOnClick}
                    handleShowModal={handleShowModal}
                  />
                );
              })}

            </ListGroup>

          </ScrollToBottom>
        </Row>

      </div>

    </>

  );
};
export default Channels;
