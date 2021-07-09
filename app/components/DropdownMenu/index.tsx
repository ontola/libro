import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Fade from '@material-ui/core/Fade';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/styles';
import { useResourceProperty } from 'link-redux';
import { SubjectProp } from 'link-redux/dist-types/types';
import React from 'react';

import { isFunction } from '../../helpers/types';
import ontola from '../../ontology/ontola';
import { LibroTheme } from '../../themes/themes';

import { TriggerButtonProps } from './TriggerButton';

export interface Test2 extends SubjectProp {
  handleClose: () => void;
}
export type RenderProp = (props: Test2) => JSX.Element;

export type Trigger = (triggerProps: TriggerButtonProps) => JSX.Element;
export interface DropdownMenuProps {
  children: React.ReactNode | RenderProp;
  className: string;
  disablePadding?: boolean;
  trigger: Trigger;
}

let count = 0;
const getNewAriaId = () => `dropdown-${count += 1}`;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  popper: {
    zIndex: theme.zIndex.modal,
  },
}));

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
  trigger,
}: DropdownMenuProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [dialogResource] = useResourceProperty(ontola.ns('dialog/manager'), ontola.ns('dialog/resource'));
  const [id, _] = React.useState(getNewAriaId());

  const handleClick = () => {
    setOpen(!open);
  };

  const handleClose = (event?: React.MouseEvent<EventTarget>) => {
    if (anchorRef.current && anchorRef.current.contains(event?.target as HTMLElement)) {
      return;
    }

    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    }
  }

  React.useEffect(() => {
    handleClose();
  }, [dialogResource]);

  return (
    <React.Fragment>
      {trigger({
        anchorRef,
        id,
        onClick: handleClick,
        open,
      })}
      <Popper
        disablePortal
        transition
        anchorEl={anchorRef.current}
        className={classes.popper}
        open={open}
        role={undefined}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <div>
              <Paper
                className={classes.paper}
                elevation={4}
              >
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocus
                    className={className}
                    id={id}
                    onKeyDown={handleListKeyDown}
                  >
                    {childComponent(children, handleClose)}
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </div>
          </Fade>
        )}
      </Popper>
    </React.Fragment>
  );
};

export { TriggerButton } from './TriggerButton';

export default DropdownMenu;
