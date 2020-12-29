import MaterialMenu from '@material-ui/core/Menu/Menu';
import React from 'react';

import { isFunction } from '../../helpers/types';

interface PropTypes {
  className: string;
  disablePadding?: boolean;
  trigger: (...args: any[]) => any;
}

const childComponent = (children: React.ReactNode | ((props: any) => any), handleClose: (props: any) => any) => {
  if (isFunction(children)) {
    const Comp = React.forwardRef((_, ref) => children({
      handleClose,
      ref,
    }));

    return <Comp />;
  }

  return children;
};

const DropdownMenu: React.FC<PropTypes> = ({
  children,
  className,
  disablePadding,
  trigger,
}) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <React.Fragment>
      {trigger(handleClick, Boolean(anchorEl))}
      <MaterialMenu
        anchorEl={anchorEl}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom',
        }}
        getContentAnchorEl={null}
        marginThreshold={0}
        MenuListProps={{ disablePadding }}
        open={Boolean(anchorEl)}
        PaperProps={{
          className,
          square: true,
        }}
        onClose={handleClose}
      >
        {childComponent(children, handleClose)}
      </MaterialMenu>
    </React.Fragment>
  );
};

export default DropdownMenu;
