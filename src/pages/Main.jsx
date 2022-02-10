import React, { useEffect } from 'react';
import {
  Container,
  Col,
  Row,

} from 'react-bootstrap';

import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { notify } from '../services/toastify.js';
import { initChat } from '../store/ChannelsSlice.js';
import Channels from '../components/Channels.jsx';
import ChatRoom from '../components/ChatRoom.jsx';

const Main = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { channelsFetchError } = useSelector((store) => store.channelsstore);

  useEffect(() => {
    dispatch(initChat());
  }, [dispatch]);

  if (channelsFetchError) {
    notify(t('fetchErrors.Network Error'), 'error');
  }

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
