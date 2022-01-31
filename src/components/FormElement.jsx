/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Button, Form,
} from 'react-bootstrap';

const Input = (props) => {
  const {
    name, label, error, touched, ...rest
  } = props;

  return (
    <Form.Group className="mb-2 position-relative">
      {label && <Form.Label htmlFor={name}>{label}</Form.Label>}
      <Form.Control name={name} isInvalid={error && touched} id={name} {...rest} />
      {error !== 'no-message' && <Form.Control.Feedback type="invalid" tooltip>{error}</Form.Control.Feedback>}

    </Form.Group>
  );
};

const Submit = (props) => {
  const { title, ...rest } = props;
  return (
    <Button
      variant="outline-primary"
      type="submit"
      className="w-100 main-button shadow"
      {...rest}
    >
      {title}
    </Button>
  );
};

const FormElement = (props) => {
  const { control, ...rest } = props;
  switch (control) {
    case 'nickname':
      return <Input type="text" {...rest} />;
    case 'password':
      return <Input type="password" {...rest} />;
    case 'submit':
      return <Submit {...rest} />;
    default:
      return <div>Default</div>;
  }
};

export default FormElement;
