import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import React from 'react';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import { makeStyles } from '@material-ui/styles';

import { LibroTheme, Margin } from '../../themes/themes';

export interface CollapsibleComparisonTitleProps {
  title: string;
  description: string;
}

const useStyles = makeStyles<LibroTheme>((theme) => ({
  description: {
    backgroundColor: '#F8FBFF',
    borderRadius: theme.shape.borderRadius,
    marginInline: '2rem',
    marginTop: theme.spacing(Margin.Medium),
    padding: '1rem',
  },
  title: {
    alignItems: 'center',
    display: 'flex',
  },
}));

export const CollapsibleComparisonTitle: React.FC<CollapsibleComparisonTitleProps> = ({ title, description }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const onChevronClick = React.useCallback(() => {
    setOpen((prevOpen) => !prevOpen);
  }, [setOpen]);

  return (
    <React.Fragment>
      <span className={classes.title}>
        <IconButton
          edge="start"
          onClick={onChevronClick}
        >
          {open ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
        </IconButton>
        {title}
      </span>
      <Collapse in={open}>
        <p className={classes.description}>
          {description}
        </p>
      </Collapse>
    </React.Fragment>
  );
};
