import PropTypes from 'prop-types';
import React from 'react';

import { Resource } from '../../components';
import Menu from '../../topologies/Menu';

const DropdownMenu = (props) => {
  const {
    children,
    trigger,
  } = props;

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Resource>
      {trigger(handleClick)}
      <Menu
        anchorEl={anchorEl}
        onClose={handleClose}
      >
        {children}
      </Menu>
    </Resource>
  );
};

DropdownMenu.propTypes = {
  children: PropTypes.node,
  trigger: PropTypes.func,
};

export default DropdownMenu;
