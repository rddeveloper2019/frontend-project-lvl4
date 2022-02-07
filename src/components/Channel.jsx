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
import { useTranslation } from 'react-i18next';

const DefaultChannel = (props) => {
  const {
    id, name, handleOnClick, active,
  } = props;

  let classes = 'channel-button';
  if (active) {
    classes += ' active';
  }

  return (
    <ListGroup.Item className="list-group-item bg-transparent border-0 py-1">
      <ButtonGroup className="w-100  ">
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
  const { t } = useTranslation();
  const {
    id, name, handleOnClick, active, handleShowModal,
  } = props;
  let classes = 'channel-button';
  if (active) {
    classes += ' active';
  }

  return (
    <ListGroup.Item className="list-group-item bg-transparent border-0 py-1 ">
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
          variant="outline-primary"

        >
          <Dropdown.Item onClick={handleShowModal(id, 'removeChannel')}>{t('channels.dropdown.remove')}</Dropdown.Item>
          <Dropdown.Item onClick={handleShowModal(id, 'renameChannel')}>{t('channels.dropdown.rename')}</Dropdown.Item>
        </DropdownButton>
      </ButtonGroup>
    </ListGroup.Item>
  );
};

const Channel = ({ removable, ...restProps }) => {
  switch (removable) {
    case true:
      return <RemovableChannel {...restProps} />;
    default:
      return <DefaultChannel {...restProps} />;
  }
};
export default Channel;
