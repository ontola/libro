import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { Collapse, IconButton } from '@mui/material';
import { makeStyles } from '@mui/styles';
import React from 'react';

import { LibroTheme, Margin } from '../../Kernel/lib/themes';

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
