import { makeStyles } from '@material-ui/styles';
import clsx from 'clsx';
import React, { ReactNode } from 'react';
import { Collapse, UnmountClosed } from 'react-collapse';

interface CollapsibleProps {
  /** Mount children if closed. */
  alwaysMountChildren?: boolean;
  children: ReactNode;
  /** Function that should dispatch a toggle action to open / close the Collapsible. */
  onClickToggle?: () => any;
  opened?: boolean;
  /** Should the first part of the content be visible when collapsed */
  preview?: boolean;
  /** Optional node that functionas as a clickable toggle. */
  trigger?: ReactNode;
}

const initialStyle = {
  height: '0px',
  overflow: 'hidden',
};

const useStyles = makeStyles(() => ({
  preview: {
    '& .ReactCollapse--collapse': {
      minHeight: '8em',
    },
    '.CardMicroRow &': {
      '& .ReactCollapse--collapse': {
        minHeight: '4em',
      },
    },
  },
  trigger: {
    cursor: 'pointer',
  },
  wrapper: {
    '& .ReactCollapse--collapse': {
      transition: 'height 500ms',
    },
  },
}));

const Collapsible = ({
  alwaysMountChildren,
  children,
  onClickToggle,
  preview,
  opened,
  trigger,
}: CollapsibleProps): JSX.Element => {
  const Component = (preview || alwaysMountChildren) ? Collapse : UnmountClosed;
  const classes = useStyles();

  const triggerElem = (
    <a
      className={classes.trigger}
      href="/"
      onClick={(e) => {
        e.preventDefault();

        if (onClickToggle) {
          onClickToggle();
        }
      }}
    >
      {trigger}
    </a>
  );

  const tabIndex = opened ? undefined : -1;
  const className = clsx({
    [classes.wrapper]: true,
    [classes.preview]: preview,
  });

  return (
    <div
      aria-expanded={opened}
      className={className}
    >
      {trigger && (
        <div>
          {triggerElem}
        </div>
      )}
      <Component
        initialStyle={initialStyle}
        isOpened={!!opened}
      >
        <div
          aria-hidden={tabIndex === -1 ? true : tabIndex}
          className="TETS"
        >
          {children}
        </div>
      </Component>
    </div>
  );
};

export default Collapsible;
