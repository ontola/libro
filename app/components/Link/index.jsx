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

import themeStyles from './ThemeStyles';
import featureStyles from './FeatureStyles';

const isActive = (to) => {
  const relative = retrievePath(to);
  const sameOrigin = !isDifferentWebsite(to);

  return (match, location) => (
    match || (sameOrigin && relative === location.pathname + location.search + location.hash)
  );
};

const Link = ({
  activeClassName,
  children,
  className,
  features,
  innerRef,
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

  if (isDifferentWebsite(to)) {
    return (
      <a
        {...other}
        className={componentClassName}
        href={to}
        ref={innerRef}
        rel="nofollow noopener noreferrer"
        target="_blank"
        onClick={onClick}
      >
        {children}
      </a>
    );
  }

  const path = retrievePath(to);
  const LinkComp = isLocalAnchor(path) ? DomLink : NavLink;
  const isExact = LinkComp === DomLink ? undefined : isIndex;

  const clickHandler = target !== 'modal'
    ? onClick
    : (e) => {
      e.preventDefault();
      lrs.actions.ontola.showDialog(rdf.namedNode(to));
      if (typeof onClick === 'function') {
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
      isActive={isActive(to)}
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
  children: PropTypes.node,
  className: PropTypes.string,
  features: PropTypes.arrayOf(
    PropTypes.oneOf([
      'bold',
      'centered',
      'padded',
    ])
  ),
  innerRef: PropTypes.func,
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
    'parent',
  ]),
  to: PropTypes.string,
};

Link.defaultProps = {
  className: 'Link',
  features: [],
  isIndex: true,
  theme: 'default',
};

export default React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);
