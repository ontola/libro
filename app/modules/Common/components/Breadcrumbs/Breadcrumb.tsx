import * as schema from '@ontologies/schema';
import { SomeNode } from 'link-lib';
import { useGlobalIds, useLinkRenderContext } from 'link-redux';
import React from 'react';

import ontola from '../../../Kernel/ontology/ontola';
import Link from '../Link';

import breadcrumbStyles from './BreadcrumbStyles';

interface PropTypes {
  image?: React.ReactNode;
  label: React.ReactNode;
  parent?: SomeNode;
  title?: string;
}

/**
 * A single part of a BreadcrumbsBar
 * @returns {component} Component
 */
const Breadcrumb: React.FC<PropTypes> = ({
  image,
  label,
  parent,
  title,
}) => {
  const classes = breadcrumbStyles();

  const { subject } = useLinkRenderContext();
  const [url] = useGlobalIds(schema.url);
  const [breadcrumb] = useGlobalIds(parent, ontola.breadcrumb);

  return (
    <Link
      className={classes.default}
      title={title}
      to={(breadcrumb ?? url ?? subject)?.value}
    >
      {image}
      <div className="Breadcrumb__text">
        {label}
      </div>
    </Link>
  );
};

export default Breadcrumb;
