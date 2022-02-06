import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import {
  Button, Modal,
} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { closeModal } from '../store/ModalSlice.js';
import getValidationSchema from '../services/validationSchemas.js';

const ModalComponent = () => {
  const { isShown, modalType } = useSelector((store) => store.modalstore);
  const dispatch = useDispatch();

  const channelRef = useRef(null);

  useEffect(() => {
    if (isShown) {
      channelRef.current.focus();
    }
  }, []);

  const optionsBy = {
    addChannel: {
      title: 'Добавить канал',
    },
    renameChannel: { title: 'Переименовать канал' },
    deleteChannel: { title: 'Удалить канал' },
  };

  const initialValues = {
    channel: '',
  };

  const handleClose = () => dispatch(closeModal());

  const onSubmit = async (values, onSubmitProps) => {
    try {
      onSubmitProps.setSubmitting(false);
    } catch (error) {
      onSubmitProps.setErrors({
        channel: error.message,
      });
      onSubmitProps.setSubmitting(false);
    }
  };

  const ModalComponentForm = () => (
    <Formik
      initialValues={initialValues}
      validationSchema={getValidationSchema({ channel: 'standart' })}
      validateOnSubmit
      onSubmit={onSubmit}
    >
      {(formik) => {
        const {
          errors,
          touched,
          handleChange,
          isValid,
          isSubmitting,
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
                      placeholder="***"
                      onChange={handleChange}
                      required
                      ref={channelRef}
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
                disabled={isSubmitting || !isValid}
              >
                Отправить
              </Button>
            </Modal.Footer>
          </Form>
        );
      }}
    </Formik>

  );

  if (!modalType || !isShown) {
    return null;
  }

  return (

    <Modal show={isShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{optionsBy[modalType].title}</Modal.Title>
      </Modal.Header>

      {(modalType === 'addChannel' || modalType === 'renameChannel') && <ModalComponentForm modalType={modalType} />}
      {modalType === 'deleteChannel' && (
      <>

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
      </>
      )}
    </Modal>

  );
};

export default ModalComponent;
