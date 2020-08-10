import rdf, { isNode, isTerm, NamedNode, Node, SomeTerm } from '@ontologies/core';
import { seqToArray } from '@rdfdev/collections';
import { normalizeType } from 'link-lib';
import { LabelType, LinkReduxLRSType, Property, Resource, useLRS } from 'link-redux';
import { PropertyPropTypes } from 'link-redux/dist-types/components/Property';
import { ResourcePropTypes } from 'link-redux/dist-types/components/Resource';
import React, { ReactElement } from 'react';
import * as ReactIs from 'react-is';

import { componentMap } from '../components';
import { topologyComponentMap } from '../topologies';

interface PropertyProps {
  onLoad?: React.ComponentType | null;
}

function isLabel(t: PropertyPropTypes | Node | Node[]): t is LabelType {
  return isTerm(t) || Array.isArray(t);
}

export function withoutLoading(label: NamedNode|NamedNode[]): PropertyPropTypes & PropertyProps {
  if (typeof label === 'undefined') {
    throw new TypeError('No label provided');
  }

  return ({
    label,
    onLoad: () => null,
  });
}
export function forceRender(label: NamedNode|NamedNode[]): PropertyPropTypes & PropertyProps {
  if (typeof label === 'undefined') {
    throw new TypeError('No label provided');
  }

  return ({
    forceRender: true,
    label,
  });
}

type ReactComp = React.ReactElement<any, any> | null;
interface DataProps {
  [k: string]: string | boolean | SomeTerm;
}

const isElement = (p: any): p is ReactElement<any, any> => {
  return ReactIs.isElement(p);
};

const component = (_: LinkReduxLRSType) => {
  function top<P = DataProps>(t: Node, props?: PropertyProps & P, children?: ReactComp[]): ReactComp;
  function top<P = DataProps>(t: Node, children?: ReactComp[]): ReactComp;
  function top<P = DataProps>(t: Node, props?: (PropertyProps & P) | ReactComp[], children?: ReactComp[]): ReactComp {
    const Comp = topologyComponentMap[rdf.id(t)] || componentMap[rdf.id(t)];
    const propsIsChildren = Array.isArray(props);
    const compProps = propsIsChildren ? {} : (props || {});
    const childElems = propsIsChildren ? props : children;

    return React.createElement(
      Comp,
      { key: t.value, ...compProps },
      childElems,
    );
  }

  return top;
};

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
  label: PropertyPropTypes | NamedNode | NamedNode[] | ReactComp,
  props?: {} | ReactComp | ReactComp[],
  children?: ReactComp[],
): ReactComp => {
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
    <Property key={normalizeType(propertyProps.label).join(',')} {...propertyProps} {...childProps}>
      {childrenNormalized}
    </Property>
  );
};

export const properties = (lrs?: LinkReduxLRSType) => (
  ...props: Array<PropertyPropTypes | NamedNode | NamedNode[] | ReactComp>
): ReactComp => {
  return React.createElement(
    React.Fragment,
    null,
    props.map((p, i) => {
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

      return <Property key={normalizeType(childProps.label).join(',') + i} {...childProps} />;
    }),
  );
};

export const resource = (_?: LinkReduxLRSType) => {
  return (props: Node | ResourcePropTypes, children: ReactComp[]) => React.createElement(
    Resource,
    isNode(props) ? { subject: props } : props,
    children.length === 0 ? null : children,
  );
};

export const useViewBuilderToolkit = () => {
  const lrs = useLRS();

  return {
    c: component(lrs),
    p: property(lrs),
    ps: properties(lrs),
    r: resource(lrs),
  };
};
