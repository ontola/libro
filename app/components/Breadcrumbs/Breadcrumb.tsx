import React from 'react';

import LDLink from '../LDLink';

import './Breadcrumbs.scss';
import breadcrumbStyles from './BreadcrumbStyles';

interface PropTypes {
  image?: React.ReactNode;
  label: React.ReactNode;
  title?: string;
}

/**
 * A single part of a BreadcrumbsBar
 * @returns {component} Component
 */
const Breadcrumb: React.FC<PropTypes> = ({
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

export default Breadcrumb;
