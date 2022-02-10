import React from 'react';
import ModalAddChannel from './Modals/ModalAddChannel.jsx';
import ModalRenameChannel from './Modals/ModalRenameChannel.jsx';
import ModalRemoveChannel from './Modals/ModalRemoveChannel.jsx';

const Modal = () => (
  <>
    <ModalAddChannel />
    <ModalRenameChannel />
    <ModalRemoveChannel />
  </>
);

export default Modal;
