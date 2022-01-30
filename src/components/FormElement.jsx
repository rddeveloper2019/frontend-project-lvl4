/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import {
  Button, Form,
} from 'react-bootstrap';

const Input = (props) => {
  const {
    name, label, error, ...rest
  } = props;
  return (
    <Form.Group className="mb-2">
      {label && <Form.Label htmlFor={name}>{label}</Form.Label>}
      <Form.Control name={name} isInvalid={error} id={name} {...rest} />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
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
