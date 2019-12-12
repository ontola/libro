import MaterialMenu from '@material-ui/core/Menu/Menu';
import PropTypes from 'prop-types';
import React, { Fragment } from 'react';

const propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.func,
  ]),
  className: PropTypes.string,
  disablePadding: PropTypes.bool,
  trigger: PropTypes.func,
};

const childComponent = (children, handleClose) => {
  if (typeof children === 'function') {
    const Comp = React.forwardRef((props, ref) => children({
      handleClose,
      ref,
    }));

    return <Comp />;
  }

  return children;
};

const DropdownMenu = ({
  children,
  className,
  disablePadding,
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
        MenuListProps={{ disablePadding }}
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
        {childComponent(children, handleClose)}
      </MaterialMenu>
    </Fragment>
  );
};

DropdownMenu.propTypes = propTypes;

export default DropdownMenu;
