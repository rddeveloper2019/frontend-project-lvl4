import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Modal,
} from 'react-bootstrap';
import useSocketsContext from '../hooks/useSocketsContext.js';

import { closeModal } from '../store/ModalSlice.js';
import ModalWithForm from './ModalWithForm.jsx';

const ModalComponent = () => {
  const dispatch = useDispatch();
  const { modalstore, chatstore } = useSelector((store) => store);
  const { selectedChannelId } = chatstore;
  const { isShown, modalType } = modalstore;
  const { emitWithPromise } = useSocketsContext();

  const handleClose = () => dispatch(closeModal());

  const onHandleDelete = () => {
    const data = { id: selectedChannelId };
    emitWithPromise('removeChannel', data, closeModal);
  };

  if (!modalType || !isShown) {
    return null;
  }

  if (modalType === 'addChannel' || modalType === 'renameChannel') {
    return <ModalWithForm />;
  }

  return (

    <Modal show={isShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удалить канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Уверены?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="danger" onClick={onHandleDelete}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>

  );
};

export default ModalComponent;
