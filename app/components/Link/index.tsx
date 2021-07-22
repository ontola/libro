import rdf from '@ontologies/core';
import clsx from 'clsx';
import { Location } from 'history';
import { useLRS } from 'link-redux';
import React, {
  CSSProperties,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
} from 'react';
import { match } from 'react-router';
import { Link as DomLink, NavLink } from 'react-router-dom';

import {
  isDifferentWebsite,
  isLocalAnchor,
  retrievePath,
} from '../../helpers/iris';
import { isFunction } from '../../helpers/types';
import app from '../../ontology/app';

import ExternalLink from './ExternalLink';
// tslint:disable ordered-imports
import featureStyles from './FeatureStyles';
import themeStyles from './ThemeStyles';

export enum LinkTarget {
  Blank = '_blank',
  Self = '_self',
  Parent = '_parent',
  Top = '_top',
  Modal = 'modal',
}

export enum LinkTheme {
  Default = 'default',
}

export enum LinkFeature {
  Bold = 'bold',
  Centered = 'centered',
}

export type IsActiveCheck = (to: string) => (locationMatch: match<any> | null, location: Location) => boolean;

export interface LinkPropTypes {
  activeClassName?: string;
  allowExternal?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  features?: LinkFeature[];
  isActive?: IsActiveCheck;
  isIndex?: boolean;
  onClick?: MouseEventHandler<Element>;
  onKeyUp?: KeyboardEventHandler<Element>;
  role?: string;
  style?: CSSProperties;
  tabIndex?: number;
  target?: LinkTarget;
  theme?: LinkTheme;
  title?: string;
  to: string;
}

interface PropTypesWithRef extends LinkPropTypes {
  innerRef: any;
}

const isActiveDefault = (to: string) => {
  const relative = retrievePath(to);
  const sameOrigin = !isDifferentWebsite(to);

  return (locationMatch: match<any>, location: Location) => (
    !!locationMatch || (sameOrigin && relative === location.pathname + location.search + location.hash)
  );
};

const Link: React.FC<PropTypesWithRef> = ({
  activeClassName,
  allowExternal = true,
  children,
  className = 'Link',
  disabled,
  features = [],
  innerRef,
  isActive,
  isIndex = true,
  onClick,
  target,
  theme = 'default',
  title,
  to,
  ...other
}) => {
  const lrs = useLRS();
  const featureClasses = featureStyles();
  const themeClasses = themeStyles();
  const componentClassName = clsx(
    className,
    themeClasses[theme],
    ...features.map((f) => featureClasses[f]),
  );

  if (disabled) {
    return (
      <button
        disabled
        title={title}
        type="button"
      >
        {children}
      </button>
    );
  }

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

  const LinkComp = isLocalAnchor(path ?? '') ? DomLink : NavLink;
  const isExact = LinkComp === DomLink ? undefined : isIndex;

  const clickHandler = target !== 'modal'
    ? onClick
    : (e: MouseEvent): (void | undefined) => {
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
      to={path ?? ''}
      onClick={clickHandler}
    >
      {children}
    </LinkComp>
  );
};

export default React.forwardRef((props: LinkPropTypes, ref) => <Link innerRef={ref} {...props} />);
