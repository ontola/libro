import rdf from '@ontologies/core';
import clsx from 'clsx';
import { useLRS } from 'link-redux';
import PropTypes from 'prop-types';
import React from 'react';
import { Link as DomLink, NavLink } from 'react-router-dom';

import {
  isDifferentWebsite,
  isLocalAnchor,
  retrievePath,
} from '../../helpers/iris';
import { isFunction } from '../../helpers/types';
import app from '../../ontology/app';

import ExternalLink from './ExternalLink';
import themeStyles from './ThemeStyles';
import featureStyles from './FeatureStyles';

export const linkFeatures = PropTypes.arrayOf(
  PropTypes.oneOf([
    'bold',
    'centered',
  ])
);

const isActiveDefault = (to) => {
  const relative = retrievePath(to);
  const sameOrigin = !isDifferentWebsite(to);

  return (match, location) => (
    match || (sameOrigin && relative === location.pathname + location.search + location.hash)
  );
};

const Link = ({
  activeClassName,
  allowExternal,
  children,
  className,
  features,
  innerRef,
  isActive,
  isIndex,
  onClick,
  target,
  theme,
  to,
  ...other
}) => {
  const lrs = useLRS();
  const themeClasses = themeStyles();
  const featureClasses = featureStyles();
  const componentClassName = clsx(
    className,
    themeClasses[theme],
    ...features.map((f) => featureClasses[f])
  );

  let path;
  if (isDifferentWebsite(to)) {
    if (!allowExternal) {
      return (
        <ExternalLink
          className={componentClassName}
          href={to}
          ref={innerRef}
          onClick={onClick}
        >
          {children}
        </ExternalLink>
      );
    }

    path = retrievePath(app.ns(`resource?iri=${encodeURIComponent(to)}`).value);
  } else {
    path = retrievePath(to);
  }

  const LinkComp = isLocalAnchor(path) ? DomLink : NavLink;
  const isExact = LinkComp === DomLink ? undefined : isIndex;

  const clickHandler = target !== 'modal'
    ? onClick
    : (e) => {
      e.preventDefault();
      lrs.actions.ontola.showDialog(rdf.namedNode(to));
      if (isFunction(onClick)) {
        onClick(e);
      }
    };

  return (
    <LinkComp
      {...other}
      activeClassName={activeClassName || 'Link__active'}
      className={componentClassName}
      exact={isExact}
      innerRef={innerRef}
      isActive={isActive ? isActive(to) : isActiveDefault(to)}
      target={target}
      to={path}
      onClick={clickHandler}
    >
      {children}
    </LinkComp>
  );
};

Link.propTypes = {
  activeClassName: PropTypes.string,
  allowExternal: PropTypes.bool,
  children: PropTypes.node,
  className: PropTypes.string,
  features: linkFeatures,
  innerRef: PropTypes.func,
  isActive: PropTypes.func,
  isIndex: PropTypes.bool,
  onClick: PropTypes.func,
  target: PropTypes.oneOf([
    '_blank',
    '_self',
    '_parent',
    '_top',
    'modal',
  ]),
  theme: PropTypes.oneOf([
    'default',
    'menu',
    'parent',
  ]),
  to: PropTypes.string,
};

Link.defaultProps = {
  allowExternal: true,
  className: 'Link',
  features: [],
  isIndex: true,
  theme: 'default',
};

export default React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
