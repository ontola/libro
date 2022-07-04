import rdf from '@ontologies/core';
import clsx from 'clsx';
// eslint-disable-next-line import/no-extraneous-dependencies
import { useLRS } from 'link-redux';
import React, {
  CSSProperties,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  Ref,
} from 'react';
import { useLocation } from 'react-router';
import { NavLink } from 'react-router-dom';

import app from '../../ontology/app';
import { isDifferentWebsite, retrievePath } from '../../lib/iris';
import { isFunction } from '../../../Kernel/lib/typeCheckers';

import ExternalLink from './ExternalLink';
// tslint:disable ordered-imports
import featureStyles from './FeatureStyles';
import { linkActiveCID } from './LinkLabel';
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
  Subtle = 'subtle',
}

export type IsActiveCheck = (to: string) => boolean;

export interface LinkProps {
  activeClassName?: string;
  allowExternal?: boolean;
  children?: React.ReactNode;
  className?: string;
  disabled?: boolean;
  features?: LinkFeature[];
  id?: string;
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

interface PropTypesWithRef extends LinkProps {
  innerRef: Ref<HTMLAnchorElement>;
}

export const isLinkTarget = (prop: string | undefined): prop is LinkTarget => (
  !!prop && Object.values(LinkTarget as any).includes(prop)
);

export const normalizeTarget = (target: string | undefined): LinkTarget | undefined => {
  const value = target?.split('/')?.pop();

  return isLinkTarget(value) ? value : undefined;
};

const useIsActive = (to: string, isActiveCheck?: IsActiveCheck) => {
  const location = useLocation();

  if (isActiveCheck) {
    return isActiveCheck(to);
  }

  const relative = retrievePath(to);
  const sameOrigin = !isDifferentWebsite(to);

  return sameOrigin && relative === location.pathname + location.search + location.hash;
};

const useClickHandler = (to: string, target?: LinkTarget, onClick?: MouseEventHandler): MouseEventHandler => {
  const lrs = useLRS();

  return React.useCallback((e: MouseEvent): void => {
    switch (target) {
    case 'modal':
      e.preventDefault();
      lrs.actions.ontola.showDialog(rdf.namedNode(to));

      if (isFunction(onClick)) {
        onClick(e);
      }

      break;
    case '_top':
      e.preventDefault();
      lrs.actions.ontola.navigate(rdf.namedNode(to));

      if (isFunction(onClick)) {
        onClick(e);
      }

      break;
    default:
      if (onClick) {
        onClick(e);
      }

      break;
    }}, [to, target, onClick]);
};

const Link = ({
  activeClassName,
  allowExternal = true,
  children,
  className = 'Link',
  disabled,
  features = [],
  innerRef,
  isActive: isActiveCheck,
  isIndex = true,
  onClick,
  target,
  theme = LinkTheme.Default,
  title,
  to,
  ...other
}: PropTypesWithRef): JSX.Element => {
  const featureClasses = featureStyles();
  const themeClasses = themeStyles();
  const active = useIsActive(to, isActiveCheck);
  const clickHandler = useClickHandler(to, target, onClick);

  const baseClassName = clsx(
    className,
    themeClasses[theme],
    ...features.map((f) => featureClasses[f]),
  );

  const linkClassName = clsx({
    [baseClassName]: true,
    [activeClassName || linkActiveCID]: active,
  });

  if (disabled) {
    return (
      <button
        disabled
        className={className}
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
          className={baseClassName}
          href={to}
          id={other.id}
          ref={innerRef}
          role={other.role}
          tabIndex={other.tabIndex}
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

  return (
    <NavLink
      {...other}
      className={linkClassName}
      end={isIndex}
      ref={innerRef}
      target={target}
      title={title}
      to={path ?? ''}
      onClick={clickHandler}
    >
      {children}
    </NavLink>
  );
};

export default React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => (
  <Link
    innerRef={ref}
    {...props}
  />
));
