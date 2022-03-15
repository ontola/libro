import {
  NamedNode,
  SomeTerm,
  isLiteral,
  isNamedNode,
} from '@ontologies/core';
import { Literal } from '@ontologies/rdfs';
import { SomeNode } from 'link-lib';
import {
  Resource,
  useLRS,
  useLinkRenderContext,
  useTopology,
} from 'link-redux';
import React, { ElementType } from 'react';

export interface OtherProps {
  collectionDisplay?: NamedNode;
  measures?: SomeNode[];
}

interface RendererProps extends OtherProps {
  value: SomeTerm;
  view?: ElementType<any>;
}

const Renderer = ({
  value,
  view: View,
  ...other
}: RendererProps): JSX.Element => {
  const topology = useTopology();
  const lrs = useLRS();
  const { subject } = useLinkRenderContext();

  if (View) {
    return (
      <View
        linkedProp={value}
        subject={subject}
        {...other}
      />
    );
  }

  if (isLiteral(value)) {
    const DataTypeView = isLiteral(value) && lrs.getComponentForProperty(Literal, value.datatype, topology ?? undefined);

    if (DataTypeView) {
      return (
        <DataTypeView
          linkedProp={value}
          subject={value.datatype}
          {...other}
        />
      );
    }
  }

  if (isNamedNode(value)) {
    return (
      <Resource
        subject={value}
        {...other}
      />
    );
  }

  return (
    <React.Fragment>
      {value.value}
    </React.Fragment>
  );
};

export default Renderer;
