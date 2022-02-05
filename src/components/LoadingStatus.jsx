import React from 'react';

import {
  ListGroup, Spinner,
} from 'react-bootstrap';

const LoadingStatus = ({ message }) => (
  <ListGroup.Item className="list-group-item bg-primary border-0">
    <div className="p-2 shadow mb-2 text-uppercase text-light not-found-label">
      <Spinner
        as="span"
        animation="grow"
        size="sm"
        role="status"
        aria-hidden="true"
        className=" bg-warning"

      />
      {message}
    </div>

  </ListGroup.Item>
);

export default LoadingStatus;
