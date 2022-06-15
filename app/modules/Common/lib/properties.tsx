import {
  NamedNode,
  Node,
  isTerm,
} from '@ontologies/core';
import { seqToArray } from '@rdfdev/collections';
import { normalizeType } from 'link-lib';
import {
  LabelType,
  LinkReduxLRSType,
  Property,
} from 'link-redux';
import { PropertyPropTypes } from 'link-redux/dist-types/components/Property';
import React from 'react';
import * as ReactIs from 'react-is';

export interface PropertyProps {
  onLoad?: React.ComponentType | null;
}

function isLabel(t: PropertyPropTypes | Node | Node[]): t is LabelType {
  return isTerm(t) || Array.isArray(t);
}

export function withoutLoading(label: NamedNode | NamedNode[]): PropertyPropTypes & PropertyProps {
  if (typeof label === 'undefined') {
    throw new TypeError('No label provided');
  }

  return ({
    label,
    onLoad: () => null,
  });
}

const isElement = (p: any): p is React.ReactElement<any, any> => ReactIs.isElement(p);

const getPropertyProps = (
  lrs: LinkReduxLRSType | undefined,
  label: PropertyPropTypes | NamedNode | NamedNode[],
): PropertyPropTypes => {
  const props = isLabel(label) ? { label } : label;

  if (typeof lrs === 'undefined') {
    return props;
  }

  props.label = normalizeType<NamedNode>(props.label)
    .flatMap((p) => [p, ...seqToArray(lrs.store, p) as NamedNode[]])
    .filter(Boolean);

  return props;
};

export const property = (lrs?: LinkReduxLRSType) => (
  label: PropertyPropTypes | NamedNode | NamedNode[] | JSX.Element,
  props?: Record<string, unknown> | JSX.Element | JSX.Element[],
  children?: JSX.Element[],
): JSX.Element => {
  if (!label || typeof label === 'string' || typeof label === 'number') {
    return label;
  }

  if (isElement(label)) {
    return label;
  }

  const propsAreChildren = ReactIs.isElement(props) || ReactIs.isValidElementType(props);
  const childProps = propsAreChildren ? {} : props || {};
  const childrenNormalized = propsAreChildren
    ? props : (!children || children.length === 0)
      ? undefined : children;

  if (ReactIs.isValidElementType(label)) {
    return React.createElement(label, null, childrenNormalized || null);
  }

  const propertyProps = getPropertyProps(lrs, label);

  return (
    <Property
      key={normalizeType(propertyProps.label).join(',')}
      {...propertyProps}
      {...childProps}
    >
      {childrenNormalized}
    </Property>
  );
};

export const properties = (lrs?: LinkReduxLRSType) => (
  ...props: Array<PropertyPropTypes | NamedNode | NamedNode[] | JSX.Element>
): JSX.Element => React.createElement(React.Fragment, null, props.map((p, i) => {
  if (!p || typeof p === 'string' || typeof p === 'number') {
    return p;
  }

  if (isElement(p)) {
    return React.createElement(React.Fragment, { key: i }, p);
  }

  if (ReactIs.isValidElementType(p)) {
    return React.createElement(p, { key: i }, null);
  }

  const childProps = getPropertyProps(lrs, p);

  return (
    <Property
      key={normalizeType(childProps.label).join(',') + i}
      {...childProps}
    />
  );
}));
