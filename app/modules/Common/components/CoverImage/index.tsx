import { makeStyles } from '@mui/styles';
import React from 'react';

import { LibroTheme, Margin } from '../../../../themes/themes';
import { cardClassIdentifier, cardFixedClassIdentifier } from '../../topologies/Card/sharedCardStyles';
import { PAGE_CID } from '../../topologies/Page';

interface PropTypes {
  positionY: number | string;
  url: string;
}

export const useCoverImageStyles = makeStyles((theme: LibroTheme) => ({
  coverImageChild: {
    [`.${cardClassIdentifier} &`]: {
      filter: 'none',
      opacity: 1,
      transform: 'none',
    },
    backgroundSize: 'cover',
    filter: 'blur(15px)',
    height: '100%',
    opacity: '.3',
    transform: 'scale(1.2)',
    width: '100%',
  },
  coverImageWrapper: {
    [`.${cardClassIdentifier} &`]: {
      borderTopLeftRadius: theme.shape.borderRadius,
      borderTopRightRadius: theme.shape.borderRadius,
      height: '7em',
      overflow: 'hidden',
      position: 'relative',
      width: '100%',
    },
    [`.${cardFixedClassIdentifier} &`]: {
      display: 'flex',
      flex: 1,
      height: 'auto',
    },
    [`.${PAGE_CID} > &`]: {
      marginTop: `-${theme.spacing(Margin.Medium)}`,
    },
    backgroundColor: theme.palette.grey.xxLight,
    height: '19em',
    left: 0,
    overflow: 'hidden',
    position: 'absolute',
    right: 0,
    top: 0,
  },
}));

/**
 * Just a wrapper component
 * @returns {component} Component
 */
const CoverImage: React.FC<PropTypes> = ({
  url,
  positionY,
}) => {
  const classes = useCoverImageStyles();

  return (
    <div className={classes.coverImageWrapper}>
      <div
        className={classes.coverImageChild}
        data-testid="coverImage"
        style={{
          backgroundImage: `url(${url})`,
          backgroundPositionY: positionY ? `${positionY}%` : undefined,
        }}
      />
    </div>
  );
};

export default CoverImage;
