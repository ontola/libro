import clsx from 'clsx';
import React from 'react';

import './PageRow.scss';

export interface PageRowProps {
  children: React.ComponentType;
  white?: boolean;
}

const PageRow = ({ children, white }: PageRowProps): JSX.Element => {
  const className = clsx({
    PageRow,
    'PageRow--white': white,
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
};

export default PageRow;
