import PropTypes from 'prop-types';
import React from 'react';

import LDLink from '../LDLink';

import './Breadcrumbs.scss';
import breadcrumbStyles from './BreadcrumbStyles';

/**
 * A single part of a BreadcrumbsBar
 * @returns {component} Component
 */
const Breadcrumb = ({
  image,
  label,
  title,
}) => {
  const classes = breadcrumbStyles();

  return (
    <LDLink className={classes.default} title={title}>
      {image}
      <div className="Breadcrumb__text">
        {label}
      </div>
    </LDLink>
  );
};

Breadcrumb.propTypes = {
  image: PropTypes.node,
  label: PropTypes.node,
  title: PropTypes.string,
};

export default Breadcrumb;
