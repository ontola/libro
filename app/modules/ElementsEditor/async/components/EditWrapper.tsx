import { makeStyles } from '@mui/styles';
import EditIcon from '@mui/icons-material/Edit';
import clsx from 'clsx';
import React, { MouseEventHandler } from 'react';

const useStyles = makeStyles({
  edit: {
    backgroundColor: 'gray',
    borderRadius: '99px',
    color: 'white',
    cursor: 'pointer',
    opacity: 0,
    padding: '4px',
    position: 'absolute',
    right: '-10px',
    top: '-10px',
    zIndex: '99',
  },
  editWrapper: {
    display: 'inline',
    position: 'relative',
  },
  showEdit: {
    opacity: 1,
  },
});

export interface EditWrapperProps {
  attributes: Record<string, unknown>;
  onClick: MouseEventHandler;
}

/**
 * Put around an editable object to show an edit icon on hover.
 * @param props Should be the slate `attributes` prop.
 * @constructor
 */
export const EditWrapper = (props: React.PropsWithChildren<EditWrapperProps>): JSX.Element => {
  const classes = useStyles();
  const { ref: _, ...attributes } = props.attributes;

  const [showIcon, setShowIcon] = React.useState(false);
  const test = React.useCallback(() => {
    setShowIcon((prevState) => !prevState);
  }, []);
  const handleClick: MouseEventHandler = React.useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();

    props.onClick(e);
  }, [props.onClick]);

  return (
    <span
      className={classes.editWrapper}
      {...attributes}
      onMouseEnter={test}
      onMouseLeave={test}
    >
      {props.children}
      <EditIcon
        className={clsx({
          [classes.edit]: true,
          [classes.showEdit]: showIcon,
        })}
        onClick={handleClick}
      />
    </span>
  );
};
