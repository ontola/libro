// @flow
import './page.scss';
import React, { PropTypes } from 'react';
import classNames from 'classnames';

const propTypes = {
  type: PropTypes.oneOf([
    'full',
    'default',
  ]),
  children: PropTypes.node.isRequired,
};

const defaultProps = {
  type: 'default',
};

function Page({ type, children }) {
  const pageClassModifier = `Page--${type}`;
  const pageClass = classNames({
    Page: true,
    [pageClassModifier]: true,
  });

  return <section className={pageClass}>{children}</section>;
}

Page.propTypes = propTypes;
Page.defaultProps = defaultProps;

export default Page;
