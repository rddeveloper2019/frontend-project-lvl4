import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Modal,
} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import useSocketsContext from '../hooks/useSocketsContext.js';
import { closeModal } from '../store/ModalSlice.js';
import getValidationSchema from '../services/validationSchemas.js';

const ModalWithForm = () => {
  const dispatch = useDispatch();

  const { modalstore, chatstore } = useSelector((store) => store);
  const { selectedChannelId, channels } = chatstore;
  const { isShown, modalType } = modalstore;
  const { emitWithPromise } = useSocketsContext();

  const channelRef = useRef(null);

  const selectedChannel = channels.find((c) => c.id === selectedChannelId);

  useEffect(() => {
    if (isShown && channelRef) {
      channelRef.current.select();
    }
  }, []);

  const optionsBy = {
    addChannel: {
      title: 'Добавить канал',
      emit: 'newChannel',
      value: '',

    },
    renameChannel: { title: 'Переименовать канал', emit: 'renameChannel', value: selectedChannel ? selectedChannel.name : '' },
    removeChannel: { title: 'Удалить канал' },
  };

  const handleClose = () => dispatch(closeModal());

  if (!modalType || !isShown) {
    return null;
  }

  const initialValues = {
    channel: optionsBy[modalType].value,
  };

  const onSubmit = (values, onSubmitProps) => {
    onSubmitProps.setSubmitting(true);

    if (modalType === 'addChannel') {
      const data = { name: values.channel };
      emitWithPromise(optionsBy[modalType].emit, data, closeModal);
    } else {
      const data = { name: values.channel, id: selectedChannelId };
      emitWithPromise(optionsBy[modalType].emit, data, closeModal);
    }

    onSubmitProps.setSubmitting(false);
    handleClose();
  };

  return (

    <Modal show={isShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{optionsBy[modalType].title}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={getValidationSchema(['channel'], channels.map((item) => item.name))}
        validateOnSubmit
        validateOnChange
        onSubmit={onSubmit}
      >
        {(formik) => {
          const {
            errors,
            touched,
            handleChange,
            values,
          } = formik;

          const getValidClass = (name) => {
            const isInvalid = touched[name] && errors[name];
            return isInvalid
              ? 'form-control is-invalid'
              : 'form-control isvalid';
          };

          return (

            <Form>
              <Modal.Body>
                <Field name="channel">
                  {() => (
                    <div className="mb-2 position-relative">
                      <input
                        id="channel"
                        className={getValidClass('channel')}
                        onChange={handleChange}
                        ref={channelRef}
                        value={values.channel}

                      />
                      { errors.channel && (
                      <div className="invalid-tooltip">
                        {errors.channel}
                      </div>
                      )}
                    </div>
                  )}
                </Field>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Отменить
                </Button>
                <Button
                  variant="outline-primary"
                  type="submit"
                >
                  Отправить
                </Button>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </Modal>

  );
};

export default ModalWithForm;
