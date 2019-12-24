import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import './PageRow.scss';

const PageRow = ({ children, white }) => {
  const className = classNames({
    PageRow,
    'PageRow--white': white,
  });

  return (
    <div className={className}>
      {children}
    </div>
  );
};

PageRow.propTypes = {
  children: PropTypes.node,
  white: PropTypes.bool,
};

export default PageRow;
