import rdf, { isNode, isTerm, NamedNode, Node, SomeTerm } from '@ontologies/core';
import { seqToArray } from '@rdfdev/collections';
import { normalizeType } from 'link-lib';
import { LabelType, LinkReduxLRSType, Property, Resource, useLRS } from 'link-redux';
import { PropertyPropTypes } from 'link-redux/dist-types/components/Property';
import { ResourcePropTypes } from 'link-redux/dist-types/components/Resource';
import React from 'react';
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
  return ({
    label,
    onLoad: () => null,
  });
}
export function forceRender(label: NamedNode|NamedNode[]): PropertyPropTypes & PropertyProps {
  return ({
    forceRender: true,
    label,
  });
}

type ReactComp = React.ReactChild;
interface DataProps {
  [k: string]: string | boolean | SomeTerm;
}

const component = (_: LinkReduxLRSType) => {
  function top<P = DataProps>(t: Node, props: PropertyProps & P, ...children: ReactComp[]): ReactComp;
  function top<P = DataProps>(t: Node, ...children: ReactComp[]): ReactComp;
  function top<P = DataProps>(t: Node, ...children: Array<(PropertyProps & P) | ReactComp>): ReactComp {
    const Comp = topologyComponentMap[rdf.id(t)] || componentMap[rdf.id(t)];
    const propsIsElem = ReactIs.isElement(children[0]);
    const compProps = propsIsElem ? {} : children[0];
    const childElems = propsIsElem ? children : children.slice(1, -1);

    return React.createElement(
      Comp,
      { key: t.value, ...compProps },
      childElems,
    );
  }

  return top;
};

const getChildProps = (
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
  props: PropertyPropTypes | NamedNode | NamedNode[] | ReactComp,
): ReactComp => {
  if (!props || typeof props === 'string' || typeof props === 'number') {
    return props;
  }

  if (ReactIs.isElement(props)) {
    return props;
  }

  if (ReactIs.isValidElementType(props)) {
    return React.createElement(props, null, null);
  }

  const childProps = getChildProps(lrs, props);

  return <Property key={normalizeType(childProps.label).join(',')} {...childProps} />;
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

      if (ReactIs.isElement(p)) {
        return React.createElement(React.Fragment, { key: i }, p);
      }

      if (ReactIs.isValidElementType(p)) {
        return React.createElement(p, { key: i }, null);
      }

      const childProps = getChildProps(lrs, p);

      return <Property key={normalizeType(childProps.label).join(',') + i} {...childProps} />;
    }),
  );
};

export const resource = (_?: LinkReduxLRSType) => {
  return (props: Node | ResourcePropTypes, ...children: ReactComp[]) => React.createElement(
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
