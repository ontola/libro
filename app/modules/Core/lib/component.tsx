import rdf, { Node, SomeTerm } from '@ontologies/core';
import React from 'react';

import { componentMap } from '../../../components';
import topologyMap from '../../../topologiesStatic';
import { PropertyProps } from '../../Common/lib/properties';

interface DataProps {
  [k: string]: string | boolean | SomeTerm;
}

type Top = {
  <P=DataProps>(
    t: Node,
    props?: ((PropertyProps & P) | undefined),
    children?: (JSX.Element[] | undefined)
  ): JSX.Element,
  (
    t: Node,
    children?: (JSX.Element[] | undefined)
  ): JSX.Element,
};

const component = (): Top => {
  function top<P = DataProps>(t: Node, props?: PropertyProps & P, children?: JSX.Element[]): JSX.Element;
  function top(t: Node, children?: JSX.Element[]): JSX.Element;
  function top<P = DataProps>(t: Node, props?: (PropertyProps & P) | JSX.Element[], children?: JSX.Element[]): JSX.Element {
    const [Comp] = topologyMap[rdf.id(t)] ?? componentMap[rdf.id(t)] ?? [];
    const propsIsChildren = Array.isArray(props);
    const compProps = propsIsChildren ? {} : (props ?? {});
    const childElems = React.Children.map(
      propsIsChildren
        ? props as JSX.Element[]
        : children,
      (child, i) => (
        <React.Fragment key={i}>
          {child}
        </React.Fragment>
      ),
    );

    return React.createElement(
      Comp,
      {
        key: t.value,
        ...compProps,
      },
      childElems,
    );
  }

  return top;
};

export default component;
