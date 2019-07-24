import MaterialMenu from '@material-ui/core/Menu/Menu';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const DropdownMenu = ({
  children,
  className,
  trigger,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Fragment>
      {trigger(handleClick, Boolean(anchorEl))}
      <MaterialMenu
        PaperProps={{
          className,
          square: true,
        }}
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        getContentAnchorEl={null}
        marginThreshold={0}
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {typeof children === 'function' ? children(handleClose) : children}
      </MaterialMenu>
    </Fragment>
  );
};

DropdownMenu.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  className: PropTypes.string,
  trigger: PropTypes.func,
};

export default DropdownMenu;
