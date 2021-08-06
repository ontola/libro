import clsx from 'clsx';
import React from 'react';

import useStyles from './DetailTextStyles';

import { DetailVariant } from './index';

export interface DetailTextProps {
  variant?: DetailVariant;
}

const DetailText: React.FC<DetailTextProps> = ({
  children,
  variant,
}) => {
  const styles = useStyles();
  const detailClass = clsx({
    [styles.wrapper]: true,
    [variant ? styles[variant] : '']: true,
  });

  if (!children) {
    return null;
  }

  return (
    <span
      className={detailClass}
      data-test="Detail-text"
    >
      {children}
    </span>
  );
};

export default DetailText;
