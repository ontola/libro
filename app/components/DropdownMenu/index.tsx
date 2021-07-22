import MaterialMenu from '@material-ui/core/Menu/Menu';
import { useResourceProperty } from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';

import { isFunction } from '../../helpers/types';
import ontola from '../../ontology/ontola';

export interface Test2 extends SubjectProp {
  handleClose: () => void;
}
export type RenderProp = (props: Test2) => JSX.Element;

export interface DropdownMenuProps {
  children: React.ReactNode | RenderProp;
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

const DropdownMenu = ({
  children,
  className,
  disablePadding,
  trigger,
}: DropdownMenuProps): JSX.Element => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [dialogResource] = useResourceProperty(ontola.ns('dialog/manager'), ontola.ns('dialog/resource'));

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    handleClose();
  }, [dialogResource]);

  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default DropdownMenu;
