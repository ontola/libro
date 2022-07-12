import clsx from 'clsx';
import React, { ChildrenProp } from 'react';

import useStyles from './DetailTextStyles';

import { DetailVariant } from './index';

export interface DetailTextProps {
  variant?: DetailVariant;
}

const DetailText: React.FC<DetailTextProps & ChildrenProp> = ({
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
      data-testid="Detail-text"
    >
      {children}
    </span>
  );
};

export default DetailText;
