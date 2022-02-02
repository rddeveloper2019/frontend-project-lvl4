import React from 'react';
import { ListGroup } from 'react-bootstrap';

const Message = ({ username, body }) => {
  console.log('message');
  return (
    <ListGroup.Item
      as="li"
      className="d-flex bg-transparent py-1 border-0"
    >
      <div className="p-1 mb-1 bg-gray text-dark d-inline-block rounded text-start">
        <b>
          {username}
          :
          {' '}
        </b>
        {body}
      </div>
    </ListGroup.Item>
  );
};

export default Message;
