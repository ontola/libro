import { createStyles, makeStyles } from '@mui/styles';
import clsx from 'clsx';
import {
  TopologyFC,
  createTopologyProvider,
  useLinkRenderContext, 
} from 'link-redux';
import React from 'react';

import { LibroTheme } from '../../../Kernel/lib/themes';
import { useConvertToKeyEvent } from '../../hooks/useConvertToKeyEvent';
import { cardTopology } from '../index';

import {
  cardClassIdentifier,
  cardStyles,
  shineStyles, 
} from './sharedCardStyles';

interface CardProps {
  className?: string;
  onClick?: () => void;
  shine?: boolean;
  warn?: boolean;
}

const useStyles = makeStyles((theme: LibroTheme) => ({
  ...createStyles({
    warn: {
      border: `2px solid ${theme.palette.red.dark}`,
    },
  }),
  ...cardStyles(theme),
  ...shineStyles,
}));

const CardTopology = createTopologyProvider(cardTopology);

/**
 * Renders an empty Card without padding
 */
const Card: TopologyFC<CardProps> = ({
  children, className, onClick, shine, warn,
}) => {
  const { subject } = useLinkRenderContext();
  const classes = useStyles();

  const onKeyDown = useConvertToKeyEvent(onClick);

  const wrapperClass = clsx({
    [cardClassIdentifier]: true,
    [classes.card]: true,
    [classes.shine]: shine,
    [classes.warn]: warn,
    [className ?? '']: className,
  });

  return (
    <CardTopology>
      <div
        className={wrapperClass}
        data-testid="card"
        resource={subject?.value}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {children}
      </div>
    </CardTopology>
  );
};

export { default as CardAppendix } from './CardAppendix';
export { default as CardFixed } from './CardFixed';
export { default as CardFloat } from './CardFloat';
export { default as CardMicroRow } from './CardMicroRow';
export { default as CardRow } from './CardRow';
export { default as CardMain } from './CardMain';

export default Card;
