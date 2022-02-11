import React, { useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Button, Modal, Form as BootstrapForm,
} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import { useTranslation } from 'react-i18next';
import useSocketsContext from '../../hooks/useSocketsContext.js';
import { closeModal } from '../../store/ModalSlice.js';
import getValidationSchema from '../../services/validationSchemas.js';
import { notify } from '../../services/toastify.js';
import useChatContext from '../../hooks/useChatContext.js';

const ModalAddChannel = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const { currentUser } = useChatContext();
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
    const data = { id: selectedChannelId, name: values.channel, createdBy: currentUser };
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

    <Modal show={isShown && modalType === 'newChannel'} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {t('modal.add')}
        </Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={{ channel: '' }}
        validationSchema={getValidationSchema('channel', channels.map((item) => item.name))}
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

export default ModalAddChannel;
