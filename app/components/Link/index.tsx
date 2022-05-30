import rdf from '@ontologies/core';
import clsx from 'clsx';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from 'history';
import { useLRS } from 'link-redux';
import React, {
  CSSProperties,
  KeyboardEventHandler,
  MouseEvent,
  MouseEventHandler,
  Ref,
} from 'react';
import { NavLink } from 'react-router-dom';

import {
  isDifferentWebsite,
  retrievePath,
} from '../../helpers/iris';
import { isFunction } from '../../helpers/types';
import app from '../../ontology/app';

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

export type IsActiveCheck = (to: string) => (locationMatch: any | null, location: Location) => boolean;

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

const Link = ({
  activeClassName,
  allowExternal = true,
  children,
  className = 'Link',
  disabled,
  features = [],
  innerRef,
  isIndex = true,
  onClick,
  target,
  theme = LinkTheme.Default,
  title,
  to,
  ...other
}: PropTypesWithRef): JSX.Element => {
  const lrs = useLRS();
  const featureClasses = featureStyles();
  const themeClasses = themeStyles();

  const baseClassName = clsx(
    className,
    themeClasses[theme],
    ...features.map((f) => featureClasses[f]),
  );

  const linkClassName = React.useCallback(({ isActive }: { isActive: boolean; }): string => clsx({
    [baseClassName]: true,
    [activeClassName || linkActiveCID]: isActive,
  }), [baseClassName]);

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
