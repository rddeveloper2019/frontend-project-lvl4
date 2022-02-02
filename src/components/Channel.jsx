/* eslint-disable no-unused-vars */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable functional/no-let */
import React from 'react';
import {
  Button,
  ListGroup,
  ButtonGroup,
  Dropdown,
  DropdownButton,
} from 'react-bootstrap';

const handleOnClick = (id) => () => {
  console.log('chanel', id);
};
const handleRename = (id) => () => {
  console.log('rename ', id);
};
const handleDelete = (id) => () => {
  console.log('delete ', id);
};

const DefaultChannel = (props) => {
  const { id, name } = props;

  let classes = 'channel-button bg-gray';
  if (props.active) {
    classes += ' active';
  }

  return (
    <ListGroup.Item className="list-group-item bg-transparent border-0 ">
      <ButtonGroup className="w-100">
        <Button
          variant="outline-primary"
          className={classes}
          onClick={handleOnClick(id)}
        >
          <span className="round me-2">#</span>
          {name}
        </Button>
      </ButtonGroup>
    </ListGroup.Item>
  );
};

const RemovableChannel = (props) => {
  let classes = 'channel-button';
  if (props.active) {
    classes += ' active';
  }
  const { id, name } = props;
  console.log('RemovableChannel');
  return (
    <ListGroup.Item className="list-group-item bg-transparent border-0 py-1">
      <ButtonGroup className="w-100">

        <Button
          variant="outline-primary"
          className={classes}
          onClick={handleOnClick(id)}
        >
          <span className="round me-2">#</span>
          {name}
        </Button>

        <DropdownButton
          as={ButtonGroup}
          title=""
          id="bg-nested-dropdown"
          variant="outline-primary"
        >
          <Dropdown.Item eventKey="1">Удалить</Dropdown.Item>
          <Dropdown.Item eventKey="2">Переименовать</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </ListGroup.Item>
  );
};

const Channel = ({ removable, ...restProps }) => {
  switch (removable) {
    case false:
      return <RemovableChannel {...restProps} />;
    default:
      return <DefaultChannel {...restProps} />;
  }
};
export default Channel;
