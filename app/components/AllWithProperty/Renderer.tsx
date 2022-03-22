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
  label: NamedNode | NamedNode[];
  value: SomeTerm;
  view?: ElementType;
}

const Renderer = ({
  label,
  value,
  view: View,
  ...otherProps
}: RendererProps): JSX.Element => {
  const topology = useTopology();
  const lrs = useLRS();
  const { subject } = useLinkRenderContext();

  if (View) {
    return (
      <View
        label={label}
        linkedProp={value}
        subject={subject}
        {...otherProps}
      />
    );
  }

  if (isLiteral(value)) {
    const DataTypeView = lrs.getComponentForProperty(Literal, value.datatype, topology ?? undefined);

    if (DataTypeView) {
      return (
        <DataTypeView
          linkedProp={value}
          subject={value.datatype}
          {...otherProps}
        />
      );
    }
  }

  if (isNamedNode(value)) {
    return (
      <Resource
        subject={value}
        {...otherProps}
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
