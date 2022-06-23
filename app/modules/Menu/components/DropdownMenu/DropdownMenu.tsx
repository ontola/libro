import {
  ClickAwayListener,
  Fade,
  MenuList,
  Paper,
  Popper,
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useFields } from 'link-redux';
import React, { ForwardedRef } from 'react';

import libro from '../../../../ontology/libro';
import { LibroTheme } from '../../../../themes/themes';
import { isFunction } from '../../../Common/lib/typeCheckers';

import { DropdownMenuContext } from './DropdownMenuContext';
import { Trigger } from './TriggerButton';

export interface MenuChildProps {
  handleClose: () => void;
  ref: ForwardedRef<unknown>;
}
export type RenderProp = (props: MenuChildProps) => (JSX.Element);

export interface DropdownMenuProps {
  children: React.ReactNode | RenderProp;
  className?: string;
  disablePadding?: boolean;
  trigger: Trigger;
  title: string;
}

let count = 0;
const getNewAriaId = () => `dropdown-${count += 1}`;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  paper: {
    '& a': {
      display: 'flex',
      padding: '10px 16px',
    },
    maxHeight: '90vh',
    overflowX: 'auto',
  },
  popper: {
    zIndex: theme.zIndex.modal,
  },
}));

const childComponent = (children: React.ReactNode | RenderProp, handleClose: () => void) => {
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
  title,
}: DropdownMenuProps): JSX.Element => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [loaded, setLoaded] = React.useState(0);
  const anchorRef = React.useRef<HTMLButtonElement>(null);
  const [dialogResource] = useFields(libro.ns('dialog/manager'), libro.ns('dialog/resource'));
  const [id, _] = React.useState(getNewAriaId());

  const loadedValue = React.useMemo(() => ({
    loaded,
    setLoaded,
  }), [loaded, setLoaded]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    setOpen(!open);
  };

  const handleClose = (event?: MouseEvent | TouchEvent) => {
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
    <DropdownMenuContext.Provider value={loadedValue}>
      {trigger({
        anchorRef,
        id,
        onClick: handleClick,
        open,
        title,
      })}
      <Popper
        transition
        anchorEl={anchorRef.current}
        className={classes.popper}
        open={open}
        placement="bottom-end"
        role={undefined}
        onClick={handleClick}
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps}>
            <Paper
              className={classes.paper}
              elevation={8}
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
          </Fade>
        )}
      </Popper>
    </DropdownMenuContext.Provider>
  );
};

export default DropdownMenu;
