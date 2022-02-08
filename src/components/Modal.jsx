import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Modal, Form as BootstrapForm,
} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import useSocketsContext from '../hooks/useSocketsContext.js';
import { closeModal } from '../store/ModalSlice.js';
import getValidationSchema from '../services/validationSchemas.js';

const ModalComponent = ({ notify }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { modalstore, chatstore } = useSelector((store) => store);
  const { selectedChannelId, channels } = chatstore;
  const { isShown, modalType } = modalstore;
  const { emitWithPromise, setOnSocketError } = useSocketsContext();

  const channelRef = useRef(null);

  const selectedChannel = channels.find((c) => c.id === selectedChannelId);

  useEffect(() => {
    if (isShown && channelRef.current) {
      channelRef.current.select();
    }
  }, [selectedChannel, isShown]);

  const optionsBy = {
    addChannel: {
      title: 'modal.add',
      emit: 'newChannel',
      value: '',
    },
    renameChannel: { title: 'modal.rename', emit: 'renameChannel', value: selectedChannel ? selectedChannel.name : '' },
    removeChannel: { title: 'modal.remove', emit: 'removeChannel', body: 'modal.affirm' },
  };

  const handleClose = () => dispatch(closeModal());

  const onSubmit = (values, onSubmitProps) => {
    const data = { id: selectedChannelId };
    onSubmitProps.setSubmitting(true);

    if (modalType === 'renameChannel' || modalType === 'addChannel') {
      data.name = values.channel;
    }
    if (modalType === 'removeChannel') {
      console.log('modal');
    }

    try {
      emitWithPromise(optionsBy[modalType].emit, data);
      notify(t(`toast.${modalType}`), 'success');
    } catch (error) {
      setOnSocketError(error.message);
    } finally {
      onSubmitProps.setSubmitting(false);
      handleClose();
    }
  };

  if (!modalType || !isShown) {
    return null;
  }

  if (modalType === 'removeChannel') {
    return (

      <Modal show={isShown} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {t(optionsBy[modalType].title)}
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
                  {t(optionsBy[modalType].body)}

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
  }

  return (

    <Modal show={isShown} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t(optionsBy[modalType].title)}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ channel: optionsBy[modalType].value }}
        validationSchema={getValidationSchema(['channel'], { array: channels.map((item) => item.name) })}
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
                        onChange={handleChange}
                        ref={channelRef}
                        value={values.channel}
                        placeholder={t('modal.channel_name')}
                      />
                      <BootstrapForm.Label className="visually-hidden" htmlFor="channel">{t('modal.channel_name')}</BootstrapForm.Label>
                      { errors.channel && (
                      <div className="invalid-tooltip">
                        {t(errors.channel)}
                      </div>
                      )}
                    </div>
                  )}
                </Field>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  {t('modal.buttons.cancel')}
                </Button>
                <Button
                  variant="outline-primary"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {t('modal.buttons.send')}
                </Button>
              </Modal.Footer>
            </Form>
          );
        }}
      </Formik>
    </Modal>

  );
};

export default ModalComponent;
