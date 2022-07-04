import { makeStyles } from '@mui/styles';
import React, { ReactNode } from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import CardFloat from '../../topologies/Card/CardFloat';
import { cardClassIdentifier } from '../../topologies/Card/sharedCardStyles';

export interface CardHeaderProps {
  /** The float content floats to the top right */
  float: ReactNode;
}

const PADDING_INLINE = 6;

const useStyles = makeStyles<LibroTheme>((theme) => ({
  cardHeader: {
    [`.${cardClassIdentifier} &`]: {
      marginRight: '-.7rem',
      paddingLeft: 0,
    },
    display: 'flex',
    marginBottom: '.5rem',
    paddingLeft: theme.spacing(PADDING_INLINE),
    paddingRight: theme.spacing(PADDING_INLINE),
  },
  header: {
    '& .Heading': {
      marginBottom: 0,
    },
    flex: 1,
  },
}));

/**
 * Holds a header and menu items that float to the top right of the card
 * @returns {component} Component
 */
const CardHeader = ({
  children,
  float,
}: React.PropsWithChildren<CardHeaderProps>): JSX.Element => {
  const classes = useStyles();

  return (
    <div className={classes.cardHeader}>
      <div className={classes.header}>
        {children}
      </div>
      <CardFloat>
        {float}
      </CardFloat>
    </div>
  );
};

export default CardHeader;
