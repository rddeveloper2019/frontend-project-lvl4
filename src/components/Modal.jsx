import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button, Modal,
} from 'react-bootstrap';

import { closeModal } from '../store/ModalSlice.js';
import ModalWithForm from './ModalWithForm.jsx';

const ModalComponent = () => {
  const { isShown, modalType } = useSelector((store) => store.modalstore);
  const dispatch = useDispatch();

  const handleClose = () => dispatch(closeModal());

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
        <Button variant="danger" onClick={handleClose}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>

  );
};

export default ModalComponent;
