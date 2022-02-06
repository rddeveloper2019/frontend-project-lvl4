import React, { useState, useRef, useEffect } from 'react';
import {
  Button, Modal,
} from 'react-bootstrap';
import { Formik, Form, Field } from 'formik';
import * as yup from 'yup';

const ModalComponentForm = ({ modalType }) => {
  const optionsBy = {
    addChannel: {
      title: 'Добавить канал',
    },
    renameChannel: { title: 'Переименовать канал' },
  };

  const channelRef = useRef(null);
  useEffect(() => {
    channelRef.current.focus();
  }, []);

  const initialValues = {
    channel: '',
  };

  const validationSchema = yup.object().shape({
    channel: yup
      .string()
      .required('Обязательное поле')
      .min(3, 'От 3 до 20 символов')
      .max(20, 'От 3 до 20 символов'),
  });

  const onSubmit = async (values, onSubmitProps) => {
    try {
      onSubmitProps.setSubmitting(false);
    } catch (error) {
      console.log(error.message);
      onSubmitProps.setErrors({
        channel: error.message,
      });
      onSubmitProps.setSubmitting(false);
    }
  };

  const handleClose = () => {};

  return (

    <>
      <Modal.Header closeButton>
        <Modal.Title>{optionsBy[modalType].title}</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
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
          console.log(errors);
          const getValidClass = (name) => {
            const isInvalid = touched[name] && errors[name];
            console.log(touched[name]);
            console.log(errors[name]);
            return isInvalid
              ? 'form-control is-invalid'
              : 'form-control isvalid';
          };

          return (

            <Form>
              {' '}
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
    </>
  );
};

const ModalComponentBody = ({ modalType }) => {
  const handleClose = () => {};
  return (
    <>
      {(modalType === 'addChannel' || modalType === 'renameChannel') && <ModalComponentForm modalType={modalType} />}
      {modalType === 'deleteChannel' && (
      <>
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
      </>
      )}

    </>
  );
};

const ModalComponent = (props) => {
  console.log(props);
  const [show, setShow] = useState(true);

  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);

  return (

    <Modal show={show} onHide={handleClose}>
      <ModalComponentBody modalType="addChannel" />
    </Modal>

  );
};

export default ModalComponent;
