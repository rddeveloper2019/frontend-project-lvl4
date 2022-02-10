import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Modal,
} from 'react-bootstrap';
import { Formik, Form } from 'formik';
import { useTranslation } from 'react-i18next';
import useSocketsContext from '../../hooks/useSocketsContext.js';
import { closeModal } from '../../store/ModalSlice.js';

import { notify } from '../../services/toastify.js';

const ModalRemoveChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { modalstore, channelsstore } = useSelector((store) => store);
  const { selectedChannelId, channels } = channelsstore;
  const { isShown, modalType } = modalstore;
  const { emitWithPromise } = useSocketsContext();

  const channelRef = useRef(null);

  const selectedChannel = channels.find((c) => c.id === selectedChannelId);

  useEffect(() => {
    if (isShown && channelRef.current) {
      channelRef.current.select();
    }
  }, [selectedChannel, isShown]);

  const handleClose = () => dispatch(closeModal());

  const onSubmit = (values, onSubmitProps) => {
    const data = { id: selectedChannelId };
    onSubmitProps.setSubmitting(true);

    try {
      emitWithPromise(modalType, data);
      notify(t(`toast.${modalType}`), 'success');
    } catch (error) {
      notify(t('fetchErrors.Network Error'), 'error');
    } finally {
      onSubmitProps.setSubmitting(false);
      handleClose();
    }
  };

  if (!modalType || !isShown) {
    return null;
  }

  return (
    <Modal show={isShown && modalType === 'removeChannel'} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modal.remove')}
        </Modal.Title>
      </Modal.Header>
      <Formik
        onSubmit={onSubmit}
        initialValues={{ id: selectedChannelId }}
      >
        {(formik) => {
          const { isSubmitting } = formik;
          return (
            <Form>
              <Modal.Body>
                {t('modal.affirm')}

              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  {t('modal.buttons.cancel')}
                </Button>
                <Button variant="danger" disabled={isSubmitting} type="submit">
                  {t('modal.buttons.remove')}
                </Button>
              </Modal.Footer>
            </Form>
          );
        } }
      </Formik>
    </Modal>
  );
};

export default ModalRemoveChannel;
