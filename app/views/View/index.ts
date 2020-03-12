import rdf from '@ontologies/core';
import { FC, register } from 'link-redux';
import React from 'react';
import { componentMap } from '../../components';

import view from '../../ontology/view';
import { allTopologies, topologyComponentMap } from '../../topologies';

const Component: FC<any> = ({ component, props, nested }) => {
  const Comp = topologyComponentMap[rdf.id(component)] || componentMap[rdf.id(component)];

  const propsIsChildren = Array.isArray(props);
  const compProps = propsIsChildren ? {} : (props || {});
  const childElems = propsIsChildren ? props : nested;

  console.log('Rendering component view', Comp, propsIsChildren, compProps, childElems);

  return (
    React.createElement(
      Comp,
      { key: component.value }, // , ...compProps },
      childElems,
    )
  );
};
Component.type = view.Component;
Component.topology = allTopologies;
Component.mapDataToProps = {
  component: view.component,
  nested: view.children,
  props: view.props,
};

const Property: FC = () => {
  return React.createElement('p', null, 'test property');
};
Property.type = view.Property;
Property.topology = allTopologies;

export default [
  ...register(Component),
  ...register(Property),
];
